import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  courseList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'course'
  }]
})

export default mongoose.model('student', studentSchema)
