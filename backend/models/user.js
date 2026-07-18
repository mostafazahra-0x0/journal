const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 5,
    trim: true
  },
  passwordHash: String,
  name: {
    type: String,
    required: true,
    minlength: 5,
  },
  days: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Day'
    }
  ]
})
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    return returnedObject
  }
})
module.exports = mongoose.model('User', userSchema)