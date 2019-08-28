const {Schema, model} = require('mongoose')

const MessageSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    label: {},
    discordMsgId: {
        type: String,
        required: true
    },
    channelId: {
        type: String,
        required: true
    },
    author: {
        type: {},
        required: true
    }
}, { timestamps: true }
)

module.exports = model('Message', MessageSchema)