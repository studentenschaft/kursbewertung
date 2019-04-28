import express from 'express'

import dashController from '../controllers/dash'
import reviewController from '../controllers/review'
const router = express.Router()


router.get('/dash', dashController)
router.post('/addreview', reviewController)
router.get('/*', (req, res) => res.send('not very specific'))

export default router
