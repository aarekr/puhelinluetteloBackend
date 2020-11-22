const mongoose = require('mongoose')

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.khl6w.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  //id: Integer,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: String,
  number: String,
  //id: Integer,
})

person.save().then(response => {
  console.log(`Added ${name} ${number} to phonebook`)
  mongoose.connection.close()
})