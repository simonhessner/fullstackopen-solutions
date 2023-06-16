const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const unknownEndpoint = (request, response) => {
  logger.error(request.path, 'is invalid')
  response.status(404).send({ error: 'unknown endpoint' })
}

const invalidId = (error, request, response, next) => {
  if(error.name === 'CastError') {
    return response.status(400).send({
      error: 'malformed ID'
    })
  }
  next(error)
}

const validationErrorHandler = (error, request, response, next) => {
  if(error.name === 'ValidationError') {
    return response.status(400).send({
      error: error.message
    })
  }

  next(error)
}

const tokenError = (error, request, response, next) => {
  if (error.name === 'JsonWebTokenError') {
    return response.status(400).json({
      error: error.message
    })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  } else {
    request.token = null
  }
  next()
}

const userExtractor = async (request, response, next) => {
  if(request.token !== null) {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(!decodedToken.id) {
      return response.status(401).json({
        error: 'token invalid'
      })
    }

    request.user = await User.findById(decodedToken.id)
  } else {
    request.user = null
  }
  next()
}

module.exports = {
  unknownEndpoint,
  invalidId,
  validationErrorHandler,
  tokenError,
  tokenExtractor,
  userExtractor
}