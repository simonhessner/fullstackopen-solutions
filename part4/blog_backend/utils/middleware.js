const logger = require('./logger')

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
}

module.exports = {
  unknownEndpoint,
  invalidId
}