const mongoose = require('mongoose')

const journalSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minlength: 1
  },
  date: {
    type: Date,
    default: () => {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return today
    }
  },
  important: {
    type: Boolean,
    default: false
  },
  metadata: {
    summary: {
      type: String
    },
    tags: {
      type: [String],
      default: []
    }
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

journalSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Journal', journalSchema)