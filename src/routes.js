const routes = require('express').Router()

routes.get('/', (req, res) => {
    console.log(`HW ${req.query.name}!`)
    return res.json(`HW ${req.query.name}`)
})

routes.post('/', (req, res) => {
    const body = req.body
    return res.json({
        "req.body": body
    })
})

module.exports = routes