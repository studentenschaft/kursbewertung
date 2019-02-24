import mongoose = from 'mongoose'

const courseSchema = new  mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  courseID: {
    type: String,
    required: true
  },
  professors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'professor'
  }],
  semesterID: {
    type: String,
    required: true
  },
  semesterShortcode: {
    type: String,
    required: true
  },
  courseDescription: {
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
})

export default mongoose.model('course', courseSchema)
