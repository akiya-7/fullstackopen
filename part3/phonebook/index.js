require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

// Getting response
morgan.token('jsonRequest', (req) => {
  console.log(req.body[0])
  if(req.body)
    return JSON.stringify(req.body)})
const postParameters = ':method :url :status :res[content-length] - :response-time ms :jsonRequest'

app.use(express.json())
app.use(morgan(postParameters))
app.use(express.static('dist'))

app.get('/api/persons', (req, res) => {
  Person
    .find({})
    .then(result => {
      res.json(result)
    })
})
app.post('/api/persons/', (req, res, next) => {
  const newPerson = req.body

  if (!newPerson) {
    return res.status(400).json({ error: 'name or number is missing' })
  }

  const person = new Person({
    name: newPerson.name,
    number: newPerson.number,
  })

  person.save()
    .then(savedNote => res.json(savedNote))
    .catch(error => next(error))
})

app.get('/api/info', (req, res) => {
  const dayInfo = new Date(Date.now())

  Person.countDocuments()
    .then(length => {
      const info = `<p>Phonebook has info for ${length} people <br/><br/> ${dayInfo}</p>`
      res.send(info)
    })
})

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id

  Person.findById(id)
    .then(person =>
    {
      if (person){
        res.json(person)
      }
      else{
        res.status(404)
          .end()
      }
    })
    .catch(error => next(error))

})
app.put('/api/persons/:id', (req, res, next) => {
  const existingPerson = req.params
  const updatedInfo = req.body

  Person.findByIdAndUpdate(existingPerson.id,
    { id: existingPerson.id, name: existingPerson.name, number: updatedInfo.number },
    { runValidators: true }).then(
    update => res.json(update)
  )
    .catch(error => {next(error)})
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  Person.findByIdAndDelete(id).then(result => console.log(result.name, 'has been deleted'))

  res.status(204)
    .end()
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () =>
  console.log(`Server started on port: ${PORT}`))