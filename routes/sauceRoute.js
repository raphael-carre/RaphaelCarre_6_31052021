/**
 * @module Routes/Sauce
 */
import express from 'express'
import auth from '../middlewares/auth.js'
import multer from '../middlewares/multer-config.js'
import validation from '../middlewares/validation.js'
import SauceCtrl from '../controllers/SauceController.js'

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
router.post('/', auth, (req, res, next) => { 
    multer(req, res, error => {
        if (error) return res.status(400).json({ message: error.message })
        next()
    })
}, validation, SauceCtrl.create)

/**
 * @name put/sauce
 * @function
 * @param {String} path Route path
 * @param {Callback} middleware1
 * @param {Callback} middleware2
 * @param {Callback} method Controller method
 */
router.put('/:id', auth, (req, res, next) => {
    multer(req, res, error => {
        if (error) return res.status(400).json({ message: error.message })
        next()
    })
}, validation, SauceCtrl.update)

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