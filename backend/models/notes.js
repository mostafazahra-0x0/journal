const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  name: String,
  metadata: {
    title: {
      type: String
    },
    tags: {
      type: [String],
      default: []
    }
  },
  notes: [
    {
      title: {
        type: String,
        required: true
      },
      noteContent: {
        type: String
      },
      important: {
        type: Boolean,
        default: false
      },
      tags: {
        type: [String],
        default: []
      }
    }
  ]
})
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    return returnedObject
  }
})
module.exports = mongoose.model('Note', noteSchema)