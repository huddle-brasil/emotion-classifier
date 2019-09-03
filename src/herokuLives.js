const axios = require('axios')
const herokuRoutes = require('express').Router()

herokuRoutes.get('/herokuLives', (req, res) => {
    res.send('just to heroku lives')
})

setInterval(async () => {
    await axios.get(`${process.env.thisAppUrl}/herokuLives`)
}, 1000 * 60 * 25)

module.exports = herokuRoutes