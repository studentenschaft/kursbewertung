import mongoose from 'mongoose'

const courseSchema = new  mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  courseNumber: {
    type: String,
    required: true,
  },
  hsgId: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: false,
  },
  semesterId: {
    type: String,
    required: false
  },
  semesterShortcode: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  examType: {
    type: String,
    required: false
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'review'
  }],
  lecturers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'lecturer'
  }],
})

export default mongoose.model('course', courseSchema)
