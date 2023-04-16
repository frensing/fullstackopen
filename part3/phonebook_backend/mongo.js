const mongoose = require('mongoose')

if (process.argv.length != 3 && process.argv.length != 5) {
  console.log('give either just password as argument, or password, name, and number as arguments')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://frensing:${password}@fullstack.u6e4qzn.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length == 5){
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  person.save().then(res => {
    console.log('added', res.name, 'number', res.number, 'to phonebook')
    mongoose.connection.close()
  })
} else if (process.argv.length == 3) {
  Person.find({}).then(res => {
    console.log('phonebook:')
    res.forEach(p => {
      console.log(p.name, p.number)
    })
    mongoose.connection.close()
  })
}