const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.set('strictQuery', false)
mongoose.connect(url)  
  .then(result => {    
    console.log('connected to MongoDB')  
  })  
  .catch((error) => {    
    console.log('error connecting to MongoDB:', error.message)  
  })

const personSchema = mongoose.Schema({
  name: String,
  number: String
})

personSchema.set('toJSON', {
  transform: (document, retObj) => {
    retObj.id = retObj._id.toString()
    delete retObj._id
    delete retObj.__v
  }
})

module.exports = mongoose.model('Person', personSchema)