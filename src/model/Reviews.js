import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
  rating: {
    overall: {
      type: Number,
      require: false,
      min: 1,
      max: 5
    },
    workload: {
      type: Number,
      require: false,
      min: 1,
      max: 5
    },
    fairGrades: {
      type: Number,
      require: false,
      min: 1,
      max: 5
    },
    expectationsMet: {
      type: Number,
      require: false,
      min: 1,
      max: 5
    },
  },
  feedback: {
    like: {
      type: String,
      required: false
    },
    dislike: {
      type: String,
      required: false,
    },
    improve: {
      type: String,
      required: false
    }
  },
  professorReviews: [{
      professor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'professor'
      },
      rating: {
        type: Number,
        require: false,
        min: 1,
        max: 5
      },
      feedback: {
        type: String,
        required: false
      }
    }
  ]
})

export default mongoose.model('review', studentSchema)
