const routes = require('express').Router()
const MessageController = require('./controllers/message');

routes.get('/messages/:messageId?', MessageController.route_getJSON)
routes.post('/messages', MessageController.route_postJSON)
routes.delete('/messages/:messageId', MessageController.route_deleteJSON)

module.exports = routes