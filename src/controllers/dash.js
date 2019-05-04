import requestify from 'requestify'

import Course from '../model/Course'
import Student from '../model/Student'
import Lecturer from '../model/Lecturer'
// TO REFACTOR L8R
async function queryHSGAPI(secTok, appId, semId) {
    // build query URL
    var courseQueryUrl =
        process.env.API_URL +
        secTok +
        '&applicationId=' +
        appId +
        '&semesterId=' +
        semId

    try {
        const response = await requestify.get(courseQueryUrl)
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
function buildLecturerObj(course) {
  const primCourse = course.Courses[0]
  return primCourse.Lecturers.map(function(lecturer){
    return {
      hsgEntityId: lecturer.HsgEntityId,
      firstName: lecturer.FirstName,
      lastName: lecturer.LastName,
    }

  })
}

async function saveCourse(courses) {
    const courseIds = courses.map(item => item.hsgId)
    let existingCourses = await Course
        .find({ hsgId: { $in: courseIds } }, 'hsgId')
        .lean()
        .exec()

    existingCourses = existingCourses.map(item => item.hsgId)

    const newCourses = courses.filter(item => !existingCourses.includes(item.hsgId))

    return await Promise.all(
        newCourses.map((course) => {
            return Course.create(course);
        })
    )
}

async function saveLecturers(lecturers) {
  const lecturerIds = lecturers.map(item => item.hsgEntityId)
  let existingLecturers = await Lecturer
      .find({ hsgEntityId: { $in: lecturerIds } }, 'hsgEntityId')
      .lean()
      .exec()

    existingLecturers = existingLecturers.map(item => item.hsgEntityId)

    const newLecturers = lecturers.filter(item => !existingLecturers.includes(item.hsgEntityId))

    return await Promise.all(
      newLecturers.map((lecturer) => {
        return Lecturer.create(lecturer);
      })
    )
}
async function saveStudent(email) {
    await Student.findOne({ email: email }, async (err, res) => {
        if (err) { throw new Error(error) }
        if (!res) { await Student.create({ email: email }) }
    })
}

async function associateWithStudent(courses, email) {
    const courseIds = courses.map(item => item.hsgId)
    let existingCourses = await Course
        .find({ hsgId: { $in: courseIds } }, 'hsgId')
        .lean()
        .exec()

    existingCourses = existingCourses.map(item => item._id)

    await Student.updateOne({ email: email }, { $set: { courseList: existingCourses } })
}

function parseCourses(courseData) {
    const courses = courseData.Data.Items
        .map((course) => buildCourseObj(course))
    return courses
}

function parseLecturers(courseData) {
  let lecturers = courseData.Data.Items
        .map((course) => buildLecturerObj(course))
  lecturers = lecturers.reduce((acc, item) => {
    item.forEach((lecturer) => {
      acc.push(lecturer)
    })
    return acc
  }, [])
    console.log(lecturers)
    return lecturers
}

//********* MAIN **************************
async function dashController(req, res) {
    const secTok = process.env.SEC_TOK
    const appId = process.env.APP_ID
    const semId = process.env.SEM_ID
    const email = process.env.EMAIL

    const courseData = await queryHSGAPI(secTok, appId, semId)

    const courses = parseCourses(courseData)
    const lecturers = parseLecturers(courseData)
    await saveCourse(courses)
    await saveLecturers(lecturers)
    await saveStudent(email)
    await associateWithStudent(courses, email)
    res.send(courses)
}


export default dashController
