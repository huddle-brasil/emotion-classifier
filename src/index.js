const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors');

const routes = require('./routes')

app.use(cors())
app.use(express.json())
app.use(routes)
mongoose.connect("mongodb+srv://huddle:Huddle-2018@cluster0-qybqp.gcp.mongodb.net/emotionClassifier?retryWrites=true&w=majority", {useNewUrlParser: true})

app.listen(3333, () => console.log("Rodando na porta 3333"))
