const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors');
const {ENVS} = require('./config/env');

const routes = require('./routes')

app.use(cors())
app.use(express.json())
app.use(routes)
mongoose.connect(ENVS.mongodb.connect, {useNewUrlParser: true})

app.listen(3333, () => console.log("Rodando na porta 3333"))
