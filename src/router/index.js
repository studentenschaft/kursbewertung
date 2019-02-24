import express from 'express'
const router = express.Router()

router.get('/wiealtbistdu', function(request, response) {
  response.send('hello from Router')
})

router.post('/', function(req, res) {

})

router.get('/evelin', (req, res) => res.send('eveline'))

router.get('/*', (req, res) => res.send('not very specific'))

// TO REFACTOR L8R
function queryHSGAPI(){

}

export default router
