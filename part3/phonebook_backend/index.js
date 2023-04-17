require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

const Person = require('./models/person')

morgan.token('body', (req, res) => JSON.stringify(req.body))

app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/info', (req, res) => {
  res.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
  `)
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).json({error: 'name missing'})
  }
  if (!body.number){
    return res.status(400).json({error: 'number missing'})
  }

  // const existing = persons.find(p => p.name === body.name)
  // if (existing) {
  //   return res.status(409).json({error: 'name must be unique'})
  // }

  const person = new Person({
    name: body.name,
    number: body.number
  })
  person.save().then(savedPerson => {
    res.json(savedPerson)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(p => {
      if (p) {
        res.json(p)
      } else {
        res.status(404).end()
      }
    })
    .catch(e => next(e))
})

app.delete('/api/persons/:id', (req, res) => {
  Person.findByIdAndRemove(req.params.id)
    .then(r => {
      res.status(204).end()
    })
    .catch(e => next(e))
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({error: 'unkown endpoint'})
}
app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.log(error)

  if (error.name === 'CastError') {
    return res.status(400).send({error: 'malformatted id'})
  }

  next(error)
}
app.use(errorHandler)