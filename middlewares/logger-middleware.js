import logger from '../config/Winston.js'

export default (req, res, next) => {
    let requestInfo = `Incoming request: ${req.method} -> ${req.path}`
    if (typeof req.query === 'object' && JSON.stringify(req.query) !== '{}') { requestInfo += `\n  Query: ${JSON.stringify(req.query)}` }
    if(process.env.NODE_ENV === 'development') {
        if (typeof req.body === 'object' && JSON.stringify(req.body) !== '{}') { requestInfo += `\n  Content: ${JSON.stringify(req.body)}`}
    }
    
    let originalSend = res.send
    res.send = function (data) {
        if (res.statusCode >= 400) {
            logger.info(requestInfo)
            logger.error(`Response: ${res.statusCode}\n  Content: ${data}`)
        }
        originalSend.apply(res, arguments)
    }
    next()
}