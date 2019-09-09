const Message = require('../models/message')
const automl = require('@google-cloud/automl');
const discordClient = require('../discord');

const automlConfig = JSON.parse(process.env.AUTOML)

exports.route_getJSON = async (req, res) => {
    const messageId = req.params.messageId
    const filter = JSON.parse(req.query.filter) || {}
    if (!messageId) {
        const messages = await Message.find(filter)
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
    message.label = await predictText(data.text)

    return res.json(await message.save())
}

exports.route_deleteJSON = async (req, res) => {
    const messageId = req.params.messageId
    return res.json(await Message.deleteOne({_id: messageId}))
}

async function predictText(text){
    const automlClient = new automl.v1beta1.PredictionServiceClient({
        credentials: automlConfig.credentials
    });
    console.log({text});
    
    const formattedName = automlClient.modelPath(automlConfig.projectId, automlConfig.zone, automlConfig.classifierId);
    
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
        const response = await automlClient.predict(request)
        let label = response[0].payload[0]
        delete label.annotationSpecId
        delete label.detail
        return label
    } catch (error) {
        console.error(error)
        return error
    }
}

discordClient.on('message', async discordMessage => {
    if (discordMessage.author.bot) return

    const text = discordMessage.content

    const label = await predictText(text)
    
    const messageData = {
        text,
        label,
        discordMsgId: discordMessage.id,
        channelId: discordMessage.channel.id,
        author: {
            id: discordMessage.author.id,
            username: discordMessage.author.username,
        }
    }
    const message = new Message(messageData)
    console.log("messageData: ", messageData);
    await message.save()

})
