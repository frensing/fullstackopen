const logger = require('./logger')
const morgan = require('morgan')

morgan.token('body', (req) => JSON.stringify(req.body))

const tokenExtractor = (request, res, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  }
  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unkown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  logger.error(error)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(400).json({ error: error.message })
  } else if (error.name === 'TokenExpiredError') {
    return res.status(401).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  morgan,
  tokenExtractor,
  unknownEndpoint,
  errorHandler
}