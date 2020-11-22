// https://puh-backend-105a.herokuapp.com/
// https://git.heroku.com/puh-backend-105a.git

require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/person')
var morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(cors())
app.use(express.static('build'))
password = '...' // tätä ei GutHubiin
const url = `mongodb+srv://fullstack:${password}@cluster0.khl6w.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`

morgan.token('/', function(request, response){
    return json.stringify(request.body)
})

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  //id: Integer,
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

app.get('/', (req, res) => {
    res.send('<p>Puhelinluettelo Backend</p>')
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
      })
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

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (body.content === undefined){
       return response.status(400).json({ error: 'contect missing'})
    }
    console.log("koko: ", persons.length)
    console.log("lisättävä: ", request.body.name)
    let i = 0
    while(i < persons.length){ // nimi jo listalla?
        if(request.body.name == persons[i].name){
            return response.status(400).json({ 
                error: 'name must be unique' 
            })
        }
        i++
    }
    const person = {
      name: body.name,
      number: body.number,
      //id: generateId()
    }
    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

const PORT = process.env.PORT // || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})