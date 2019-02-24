import requestify from 'requestify'

import Course from '../model/Course'
import Student from '../model/Student'
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
  
  async function saveStudent(email){
    await Student.findOne({email: email}, async (err, res) => {
      if(err){throw new Error(error)}
      if(!res){
          const student = await Student.create({email: email})
          return student
      }
      return res
    })
  }
  
  async function associateWithStudent(courses, email){
    const courseIds = courses.map(item => item.hsgId)
    let existingCourses = await Course
      .find({hsgId: {$in: courseIds}}, 'hsgId')
      .lean()
      .exec()
    
    existingCourses = existingCourses.map(item => item._id)
    console.log(existingCourses)
    
    await Student.updateOne({email: email}, {$set: {courseList: existingCourses}})
  }
  
  function parseCourses(courseData){
    const courses = courseData.Data.Items
      .map((course) => buildCourseObj(course))
    return courses
  }

async function dashController (req, res) {
    const secTok = process.env.SEC_TOK
    const appId = process.env.APP_ID
    const semId = process.env.SEM_ID
    const email = process.env.EMAIL
    const courseData = await queryHSGAPI(secTok, appId, semId)
  
    const courses = parseCourses(courseData)
    await saveCourse(courses)
    await saveStudent(email)
    await associateWithStudent(courses, email)
    res.send(courses)
  }


export default dashController  