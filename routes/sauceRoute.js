import express from 'express'
import auth from '../middlewares/auth.js'
import multer from '../middlewares/multer-config.js'
import SauceCtrl from '../controllers/SauceController.js'

const router = express.Router()

router.get('/', auth, SauceCtrl.getAll)
router.get('/:id', auth, SauceCtrl.getOne)
router.post('/', auth, multer, SauceCtrl.create)
router.put('/:id', auth, multer, SauceCtrl.update)
router.delete('/:id', auth, SauceCtrl.delete)
router.post('/:id/like', auth, SauceCtrl.like)

export default router