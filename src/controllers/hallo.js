import importedData from '../courseData.json'

//console.log(importedData);

// const obj = {
//   ContentEncoding: null,
//   ContentType: null,
//   Data: [
//     'hello world'
//   ]
// }

const Item = importedData.Data.Items[0]
const shortName = Item.Courses[0].ShortName

const course = {
  shortName: shortName,
  courseId: 'as;dlfkjasdf'
}



var dataArray = importedData.Data.Items[0].Courses[0].ShortName

console.log(dataArray);




// Course.create(course)


//
// const courseSchema = new  mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   courseID: {
//     type: String,
//     required: true
//   },
//   professors: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'professor'
//   }],
//   semesterID: {
//     type: String,
//     required: true
//   },
//   semesterShortcode: {
//     type: String,
//     required: true
//   },
//   courseDescription: {
//     type: String,
//     required: false
//   },
//   examType: {
//     type: String,
//     required: false
//   },
//   reviews: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'review'
//   }],
// })


//export default mongoose.model('course', courseSchema)
