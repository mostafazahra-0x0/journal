const mongoose = require('mongoose')

const journalSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  page: {
    content: {
      type: String,
    },
    metadata: {
      title: {
        type: String,
      },
      summary: {
        type: String,
      },
      tags: {
        type: [String],
        default: [],
      },
    },
  },
})
journalSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    return returnedObject
  }
})
module.exports = mongoose.model('Journal', journalSchema)