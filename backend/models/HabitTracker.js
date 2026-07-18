const mongoose = require('mongoose')

const habitTrackerSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  categories: [
    {
      categoryName: {
        type: String,
        required: true,
      },
      habits: [
        {
          name: {
            type: String,
            required: true,
          },
          completed: {
            type: Boolean,
            default: false,
          },
        }
      ],
    }
  ],
})
habitTrackerSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    return returnedObject
  }
})
module.exports = mongoose.model('HabitTracker', habitTrackerSchema)