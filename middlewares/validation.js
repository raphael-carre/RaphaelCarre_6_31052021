import Validator from '../config/Validator.js'

const validation = (req, res, next) => {
    const validator = new Validator()
    const body = req.body
    let datas

    if (req.file) {
        for (let key in body) {
            typeof body[key] === 'string' && (datas = JSON.parse(body[key]))
        }
    } else {
        datas = body
    }

    try { 
        validator.test(datas)
        next()
    }
    catch (error) { return res.status(400).json({ message: error.message })}
}

export default validation