import mongoose from 'mongoose'

const lecturerSchema = new mongoose.Schema({
  hsgEntityId: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
})

export default mongoose.model('lecturer', lecturerSchema)
