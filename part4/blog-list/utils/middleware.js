const logger = require('./logger')
const morgan = require('morgan')

morgan.token('body', (req) => JSON.stringify(req.body))

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unkown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  logger.error(error)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  morgan,
  unknownEndpoint,
  errorHandler
}