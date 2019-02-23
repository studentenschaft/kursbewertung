import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  courseList: []
})

export default mongoose.model('student', studentSchema)
