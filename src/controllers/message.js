const Message = require('../models/message')

module.exports = {
    async route_getJSON(req, res) {
        const messageId = req.params.messageId
        const message = await Message.findById(messageId)

        if (!message) return res.status(400).json({"response": "error on get message"})

        return res.json(message)
    },

    async route_postJSON(req, res) {
        const data = req.body

        const message = new Message(data)
        return res.json(await message.save())

        // const message = await Message.create(data)
        // return res.json(message)
    }
}

