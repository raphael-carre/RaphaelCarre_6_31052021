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

const errorHandler = error => {
    if (error.syscall !== 'listen') throw error

    const address = server.address()
    const bind = typeof address === 'string' ? `pipe ${address}` : `port: ${port}`

    switch (error.code) {
        case 'EACCES':
            logger.error(`${bind} requires elevated privileges.`);
            process.exit(1)
            break
        case 'EADDRINUSE':
            logger.error(`${bind} is already in use.`)
            process.exit(1)
            break
        default:
            throw error
    }
}

server.on('error', errorHandler)
server.on('listening', () => {
    logger.info(`Server started on http://localhost:${port}`)
})

server.listen(port)