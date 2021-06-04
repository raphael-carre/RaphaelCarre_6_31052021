import http from 'http'
import app from './app.js'
import logger from './config/Winston.js'

const normalizePort = val => {
    const port = parseInt(val, 10)
    if (isNaN(val)) return val
    return port >= 0 ? port : false
}

const port = normalizePort(process.env.PORT || '3000')

const server = http.createServer(app)

server.on('listening', () => {
    logger.info(`Server started on http://localhost:${port}`)
})

server.listen(port)