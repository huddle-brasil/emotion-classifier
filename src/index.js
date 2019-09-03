const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors');
const port = process.env.PORT || 8080;

const routes = require('./routes')
const herokuRoutes = require('./herokuLives')

app.use(cors())
app.use(express.json())
app.use(routes)
app.use(herokuRoutes)
mongoose.connect(process.env.MONGODB, {useNewUrlParser: true})

app.listen(port, () => console.log(`Rodando na porta ${port}`))

exports.app