// https://puh-backend-105a.herokuapp.com/
// https://git.heroku.com/puh-backend-105a.git

require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Person = require('./models/person')
var morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

app.use(express.json())
app.use(express.static('build'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(cors())
app.use(bodyParser.json())

morgan.token('/', function(request, response){
    return json.stringify(request.body)
})

let persons = [
    { 
        name: "Arto Hellas",
        number: "040-1231244",
        id: 1
    },
    { 
        name: 'Ada Lovelace',
        number: '+31-231-12314',
        id: 2
    },
    { 
        name: 'Dan Abramov',
        number: '12-43-234345',
        id: 3
    },
    { 
        name: 'Mary Poppendieck',
        number: '39-23-6423122',
        id: 4
    }
]

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if(person){
                response.json(person.toJSON)
            } else{
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.get('/info', (req, res) => {
    const koko = persons.length
    const nyt = new Date()
    res.send(`<p>Phonebook has info for ${koko} people</p> ${nyt}`)
})

const generateId = () => {
    const maxId = persons.length > 0
      ? Math.floor(1000*Math.random(...persons.map(p => p.id)))
      : 0
    return maxId + 1
}

app.post('/api/persons', (request, response, next) => {
    const body = request.body
    if (body.name === undefined){
       return response.status(400).json({ error: 'name missing'})
    }
    let i = 0
    while(i < persons.length){ // nimi jo listalla?
        if(request.body.name == persons[i].name){
            return response.status(400).json({ 
                error: 'name must be unique' 
            })
        }
        i++
    }
    const person = new Person({
        name: body.name,
        number: body.number,
    })
    person.save()
        .then(savedPerson => {
            response.json(savedPerson.toJSON)
        })
        .then(savedAndFormattedPerson => {
            response.json(savedAndFormattedPerson)
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {    
        return response.status(400).json({ error: error.message })  
    }
    next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})