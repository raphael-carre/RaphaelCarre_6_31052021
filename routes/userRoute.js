/**
 * @module Routes/User
 */
import express from 'express'
import validation from '../middlewares/validation.js'
import UserCtrl from '../controllers/UserController.js'

const router = express.Router()

/**
 * @name user/signup
 * @function
 * @param {String} path Route path
 * @param {Callback} middleware
 * @param {Callback} method Controller method
 */
router.post('/signup', validation, UserCtrl.signup)

/**
 * @name user/login
 * @function
 * @param {String} path Route path
 * @param {Callback} middleware
 * @param {Callback} method Controller method
 */
router.post('/login', validation, UserCtrl.login)

export default router