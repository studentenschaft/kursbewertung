import express from 'express'
import requestify from 'requestify'

import Course from '../model/Course'

const router = express.Router()

// TO REFACTOR L8R
async function queryHSGAPI(secTok, appId, semId){
  // build query URL
  var courseQueryUrl =
      'https://tools.unisg.ch/Api/V20120101/CourseInformation/GetLatestPublishedForStudentBySecurityToken?securityToken=' +
      secTok +
      '&applicationId=' +
      appId +
      '&semesterId=' +
      semId

  try {
    const response =  await requestify.get(courseQueryUrl)
    return response.getBody()
  } catch (error) {
    console.log(error)
    return "There was an error, please contact the administrator"
  }
}

function buildCourseObj(course) {
  // Would later assume that course an element of Items[x].Courses
  // for now set Primary Course to first element
  const primCourse = course.Courses[0]
  return {
    courseNumber: primCourse.CourseNumber,
    language: primCourse.Language,
    name: primCourse.ShortName,
    hsgId: primCourse.Id,
    description: course.CourseContent
  }
}

async function saveCourse(courses){
  const courseIds = courses.map(item => item.hsgId)
  let existingCourses = await Course
    .find({hsgId: {$in: courseIds}}, 'hsgId')
    .lean()
    .exec()
  existingCourses = existingCourses.map(item => item.hsgId)
  
  const newCourses = courses.filter(item => !existingCourses.includes(item.hsgId))

  return await Promise.all(
    newCourses.map((course) => Course.create(course))
  )
}

function parseCourses(courseData){
  const courses = courseData.Data.Items
    .map((course) => buildCourseObj(course))
  return courses
}

router.get('/dash', async (req, res) => {
  const secTok = process.env.SEC_TOK
  const appId = process.env.APP_ID
  const semId = process.env.SEM_ID
  const courseData = await queryHSGAPI(secTok, appId, semId)

  const courses = parseCourses(courseData)
  saveCourse(courses)
  // associateWithStudent()
  res.send(courses)
})

router.get('/*', (req, res) => res.send('not very specific'))

export default router
