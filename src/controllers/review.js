
import Review from '../model/Review'
import Course from '../model/Course'

async function buildReviewObj(review){
   return {
    course: await getID(review.courseID),
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
async function getID(hsgId){
  return Course.findOne({hsgId: hsgId}, '_id', function(err, courseId){
    console.log(courseId)
    return courseId._id
  })

}
//*******MAIN************
async function reviewController (req, res) {
    const review = req.body
    const reviewObj = await buildReviewObj(review)

    try {
      Review.create(reviewObj)
      res.sendStatus(200)
    } catch (e) {
      console.log(e);
      res.sendStatus(500)
    }

}

export default reviewController
