
import Review from '../model/Review'

function buildReviewObj(review){
  return {
    course: review.courseID,
    rating: {
      overall: review.overall,
      workload: review.workload,
      professor: review.professor,
      fairGrades: review.fairness,
      expectationsMet: review.expectationsMet,
    },
    feedback: {
      like: review.feedback.like,
      dislike: review.feedback.dislike,
      improve: review.feedback.improve,

    },
    professorReviews: []
  }
}

//*******MAIN************
function reviewController (req, res) {
    const review = req.body
    const reviewObj = buildReviewObj(review)
    try {
      Review.create(reviewObj)
      res.sendStatus(200)
    } catch (e) {
      console.log(e);
      res.sendStatus(500)
    }

}

export default reviewController
