import express from 'express'
import SauceCtrl from '../controllers/SauceController.js'
import auth from '../middlewares/auth.js'

const router = express.Router()

router.get('/', auth, SauceCtrl.getAll)
router.get('/:id', auth, SauceCtrl.getOne)
router.post('/', auth, SauceCtrl.create)
router.put('/:id', auth, SauceCtrl.update)
router.delete('/:id', auth, SauceCtrl.delete)
router.post('/:id/like', auth, SauceCtrl.like)

export default router