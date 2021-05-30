import express from 'express'
import dotenv from 'dotenv'
import mongoDb from './database/Database.js'

const app = express()

dotenv.config({ path: './config/.env' })
mongoDb.connection()

app.use(express.json())

app.get('/', (req, res) => {
    res.write('Homepage')
    res.end()
})

export default app