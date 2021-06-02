/**
 * @module Routes/User
 */
import express from 'express'
import UserCtrl from '../controllers/UserController.js'

const router = express.Router()

/**
 * @name user/signup
 * @function
 * @param {String} path Route path
 * @param {Callback} method Controller method
 */
router.post('/signup', UserCtrl.signup)

/**
 * @name user/login
 * @function
 * @param {String} path Route path
 * @param {Callback} method Controller method
 */
router.post('/login', UserCtrl.login)

export default router