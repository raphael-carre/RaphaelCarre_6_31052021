import express from 'express'
import UserCtrl from '../controllers/UserController.js'

const router = express.Router()

router.post('/signup', UserCtrl.signup)
router.post('/login', UserCtrl.login)

export default router