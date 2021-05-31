import express from 'express'
import SauceCtrl from '../controllers/SauceController.js'

const router = express.Router()

router.get('/', SauceCtrl.getAll)
router.get('/:id', SauceCtrl.getOne)
router.post('/', SauceCtrl.create)
router.put('/:id', SauceCtrl.update)
router.delete('/:id', SauceCtrl.delete)
router.post('/:id/like', SauceCtrl.like)

export default router