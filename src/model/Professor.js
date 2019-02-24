import mongoose from 'mongoose'

const professorSchema = new mongoose.Schema({
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

export default mongoose.model('professor', professorSchema)
