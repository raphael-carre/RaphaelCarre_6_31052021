import multer from 'multer'
import Validator from '../config/Validator.js'

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split('.').slice(0, -1).join('').split(' ').join('_')
        const extension = MIME_TYPES[file.mimetype]
        callback(null, `${name + Date.now()}.${extension}`)
    }
})

const fileFilter = (req, file, callback) => {
    const validator = new Validator()
    try {
        validator.test(JSON.parse(req.body.sauce))
        callback(null, true)
    }
    catch (error) {
        callback(error, false)
    }
}

export default multer({ storage, fileFilter }).single('image')