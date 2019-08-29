const Message = require('../models/message')
const automl = require('@google-cloud/automl');

const Discord = require('discord.js');
const client = new Discord.Client()

let automlConfig = process.env.AUTOML 
automlConfig = JSON.parse(automlConfig)



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
    message.label = await predictText(data.text)

    return res.json(await message.save())
    // const message = await Message.create(data)
    return res.json(message)
    // return res.json(message.label)
}

exports.route_deleteJSON = async (req, res) => {
    const messageId = req.params.messageId
    return res.json(await Message.deleteOne({_id: messageId}))
}

async function predictText(text){
    const client = new automl.v1beta1.PredictionServiceClient({
        credentials: automlConfig.credentials
    });
    console.log({text});
    
    const formattedName = client.modelPath(automlConfig.projectId, automlConfig.zone, automlConfig.classifierId);
    
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
        let label = response[0].payload[0]
        delete label.annotationSpecId
        delete label.detail
        return label
    } catch (error) {
        console.error(error)
        return error
    }
}

client.on('ready', () => console.log("I am ready"))

client.login(process.env.DISCORD_TOKEN)

client.on('message', async discordMessage => {
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

    // message.channel.send(`\`\`\`json\n${label.displayName}\n\`\`\``);
})
