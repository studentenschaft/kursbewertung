require('dotenv').config()

import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'

import router from './router/index.js'

const port = 4000

const app = express()

app.use(express.json())
app.use(morgan('tiny'))
app.use('/', router)

async function start() {
  await mongoose.connect('mongodb://localhost:27017/kursbewertungen', {useNewUrlParser: true})

  app.listen(port, function serverStart() {
    console.log('Server ready on ' + port);
  })
}

start()
