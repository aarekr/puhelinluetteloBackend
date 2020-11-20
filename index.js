const express = require('express')
const app = express()

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

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})