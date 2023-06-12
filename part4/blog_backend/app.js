const { mongoURI } = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const logger = require('./utils/logger')
const { unknownEndpoint } = require('./utils/middleware')

mongoose.set('strictQuery', false)

logger.info('connecting to', mongoURI)
mongoose.connect(mongoURI)
  .then(() => {
    logger.info('connected to mongoDB')
  })
  .catch(error => {
    logger.error('error connecting to MongoDB', error.message)
  })

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

app.use(unknownEndpoint)

module.exports = app