const {Schema, model} = require('mongoose')

const MessageSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    discordId: {
        type: String,
        required: true
    },
    author: {
        type: {},
        required: true
    },
    channelId: {
        type: String,
        required: true
    },
    labels: [],
}, { timestamps: true }
)

module.exports = model('Message', MessageSchema)