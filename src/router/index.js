import express from 'express'

import dashController from '../controllers/dash'

const router = express.Router()

router.get('/dash', dashController)
router.get('/*', (req, res) => res.send('not very specific'))

export default router