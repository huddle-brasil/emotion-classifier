const Message = require('../models/message')
const automl = require('@google-cloud/automl');
const {ENVS} = require('../config/env');

exports.route_getJSON = async (req, res) => {
    const messageId = req.params.messageId
    if (!messageId) {
        const messages = await Message.find({})
        if (messages.length === 0) return res.status(400).json({"response": "There isn't messages on DB"})
        return res.json(messages)
    }
    const message = await Message.findById(messageId)

    if (!message) return res.status(400).json({"response": "error on get message"})

    return res.json(message)
}

exports.route_postJSON = async (req, res) => {
    const data = req.body

    const message = new Message(data)
    //autoML
    const labels = await predictText(data.text)
    console.log("labels: ", labels);
    delete labels[0].annotationSpecId
    delete labels[0].detail

    message.label = labels[0]
    // return res.json(await message.save())
    return res.json(labels[0])

    // const message = await Message.create(data)
    // return res.json(message)
}

exports.route_deleteJSON = async (req, res) => {
    const messageId = req.params.messageId
    return res.json(await Message.deleteOne({_id: messageId}))
}

async function predictText(text){
    const client = new automl.v1beta1.PredictionServiceClient({
        credentials: ENVS.automl.credentials
    });
    console.log({text});
    
    const formattedName = client.modelPath(ENVS.automl.projectId, ENVS.automl.zone, ENVS.automl.classifierId);
    
    const payload = {
        "textSnippet": {
            "content": text,
            "mime_type": "text/plain"
        }
    };
    
    const request = {
        name: formattedName,
        payload,
    };

    try {
        const response = await client.predict(request)
        return response[0].payload
    } catch (error) {
        console.error(error)
        return error
    }
}

