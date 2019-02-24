import express from 'express'
import morgan from 'morgan'
import requestify from 'requestify'
const router = express.Router()

// TO REFACTOR L8R
async function queryHSGAPI(secTok, appId, semId){
  // build query URL
  console.log(secTok)
  var courseQueryUrl =
      'https://tools.unisg.ch/Api/V20120101/CourseInformation/GetLatestPublishedForStudentBySecurityToken?securityToken=' +
      secTok +
      '&applicationId=' +
      appId +
      '&semesterId=' +
      semId

  try {
    return await requestify.get(courseQueryUrl).getBody()
  } catch (error) {
    return "There was an error, please contact the administrator"
  }



}

router.get('/wiealtbistdu', function(request, response) {
  response.send('hello from Router')
})

router.post('/', function(req, res) {

})

router.get('/evelin', (req, res) => res.send('eveline'))

router.get('/dash', async (req, res) => {
  let secTok = process.env.SEC_TOK
  let appId = process.env.APP_ID
  let semId = process.env.SEM_ID
  res.send(await queryHSGAPI(secTok, appId, semId))
})

router.get('/*', (req, res) => res.send('not very specific'))

export default router
