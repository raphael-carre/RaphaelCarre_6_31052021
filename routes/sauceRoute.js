/**
 * @module Routes/Sauce
 */
import express from 'express'
import auth from '../middlewares/auth.js'
import multer from '../middlewares/multer-config.js'
import SauceCtrl from '../controllers/SauceController.js'
import validation from '../middlewares/validation.js'

const router = express.Router()

/**
 * @name get/sauces
 * @function
 * @param {String} path Route path
 * @param {Callback} middleware
 * @param {Callback} method Controller method
 */
router.get('/', auth, SauceCtrl.getAll)

/**
 * @name get/sauce
 * @function
 * @param {String} path Route path
 * @param {Callback} middleware
 * @param {Callback} method Controller method
 */
router.get('/:id', auth, SauceCtrl.getOne)

/**
 * @name post/sauce
 * @function
 * @param {String} path Route path
 * @param {Callback} middleware1
 * @param {Callback} middleware2
 * @param {Callback} method Controller method
 */
router.post('/', auth, multer, validation, SauceCtrl.create)

/**
 * @name put/sauce
 * @function
 * @param {String} path Route path
 * @param {Callback} middleware1
 * @param {Callback} middleware2
 * @param {Callback} method Controller method
 */
router.put('/:id', auth, multer, validation, SauceCtrl.update)

/**
 * @name delete/sauce
 * @function
 * @param {String} path Route path
 * @param {Callback} middleware
 * @param {Callback} method Controller method
 */
router.delete('/:id', auth, SauceCtrl.delete)

/**
 * @name post/like
 * @function
 * @param {String} path Route path
 * @param {Callback} middleware
 * @param {Callback} method Controller method
 */
router.post('/:id/like', auth, SauceCtrl.like)

export default router