import http from 'http'
import dotenv from 'dotenv'
import app from './app.js'

dotenv.config({ path: './config/.env' })

const normalizePort = val => {
    const port = parseInt(val, 10)
    if (isNaN(val)) return val
    return port >= 0 ? port : false
}

const port = normalizePort(process.env.SERVER_PORT || '3000')

const server = http.createServer(app)

server.on('listening', () => {
    console.log(`Server started on http://localhost:${port}`)
})

server.listen(port)