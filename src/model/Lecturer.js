import mongoose from 'mongoose'

const lecturerSchema = new mongoose.Schema({
  hsgEntityId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  }
})

export default mongoose.model('lecturer', professorSchema)
