const { MONGODB_URI } = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const logger = require('./utils/logger')
const { unknownEndpoint } = require('./utils/middleware')
const morgan = require('morgan')

mongoose.set('strictQuery', false)

logger.info('connecting to', MONGODB_URI)
mongoose.connect(MONGODB_URI)
  .then(() => {
    logger.info('connected to mongoDB')
  })
  .catch(error => {
    logger.error('error connecting to MongoDB', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

app.use('/api/blogs', blogsRouter)

app.use(unknownEndpoint)

module.exports = app