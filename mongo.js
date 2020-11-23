const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

//const url = `mongodb+srv://fullstack:${password}@cluster0.khl6w.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`
const url = `mongodb+srv://fullstack:${password}@cluster0.khl6w.mongodb.net/puhelinluettelo?retryWrites=true`


mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
//mongoose.connect(`mongodb+srv://fullstack:${password}@cluster0.khl6w.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`)
//mongoose.connect(`mongodb+srv://fullstack:<password>@cluster0.khl6w.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`)

const personSchema = new mongoose.Schema({
  name: {
      type: String,
      minLength: 3,
      required: true
  },
  number: {
      type: String,
      minLength: 5,
      required: true
  },
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length===3) {
  console.log('all people')
  process.exit(1)
}

person.save().then(response => {
  console.log(`Added ${name} ${number} to phonebook`)
  mongoose.connection.close()
})