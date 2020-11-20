const express = require('express')
const app = express()

app.use(express.json())

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
    if (!request.body.name) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
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

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})