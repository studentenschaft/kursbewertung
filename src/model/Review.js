import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
  course: {
    // type: mongoose.Schema.Types.ObjectId,
    type: String,
    require: true
  },
  rating: {
    overall: {
      type: Number,
      require: false,
      min: 1,
      max: 6
    },
    workload: {
      type: Number,
      require: false,
      min: 1,
      max: 6
    },
    fairGrades: {
      type: Number,
      require: false,
      min: 1,
      max: 6
    },
    expectationsMet: {
      type: Number,
      require: false,
      min: 1,
      max: 6
    },
    professor: {
      type: Number,
      require: false,
      min: 1,
      max: 6
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
        max: 6
      },
      feedback: {
        type: String,
        required: false
      }
    }
  ]
})

export default mongoose.model('review', reviewSchema)
