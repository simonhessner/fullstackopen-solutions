const logger = require('./logger')

const unknownEndpoint = (request, response) => {
  logger.error(request.path, 'is invalid')
  response.status(404).send({ error: 'unknown endpoint' })
}

module.exports = {
  unknownEndpoint
}