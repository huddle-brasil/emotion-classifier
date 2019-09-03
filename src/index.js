const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors');
//const {ENVS} = require('./config/env');
const port = process.env.PORT || 8080;


const routes = require('./routes')

app.use(cors())
app.use(express.json())
app.use(routes)
mongoose.connect(process.env.MONGODB, {useNewUrlParser: true})

app.listen(port, () => console.log(`Rodando na porta ${port}`))
console.log('Oi Heroku')

