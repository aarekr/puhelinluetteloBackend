// https://puh-backend-105a.herokuapp.com/
// https://git.heroku.com/puh-backend-105a.git

const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(cors())

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
    res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if(person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
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
    if (!request.body.name) { // puuttuuko nimi?
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
    if (!request.body.number) { // puuttuuko numero?
        return response.status(400).json({ 
          error: 'content missing' 
        })
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
      name: request.body.name,
      number: request.body.number,
      id: generateId()
    }
    persons = persons.concat(person)
    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})