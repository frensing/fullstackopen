const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  passwordHash: String,
  blogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }]
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, retObj) => {
    retObj.id = retObj._id.toString()
    delete retObj._id
    delete retObj.__v
    delete retObj.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User