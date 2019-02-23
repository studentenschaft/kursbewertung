import express from 'express'
const router = express.Router()

router.get('/', function(req, res) {
  res.send('hello from Router')
})

router.post('/', function(req, res) {

})

router.get('/evelin', (req, res) => res.send('eveline'))

router.get('/*', (req, res) => res.send('not very specific'))

export default router
