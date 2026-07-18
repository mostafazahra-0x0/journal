const mongoose = require('mongoose')

const daySchema = new mongoose.Schema({
  date: {
    type: String,
  },
  rating: {
    type: Number,
  },
  journal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Journal'
  },
  notes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Note'
  },
  habits: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'HabitTracker' 
  },
})
daySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    return returnedObject
  }
})
module.exports = mongoose.model('Day', daySchema)