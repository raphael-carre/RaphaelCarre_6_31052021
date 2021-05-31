import express from 'express'
import dotenv from 'dotenv'
import mongoDb from './database/Database.js'
import userRoute from './routes/userRoute.js'
import sauceRoute from './routes/sauceRoute.js'

const app = express()

dotenv.config({ path: './config/.env' })
mongoDb.connection()

app.use(express.json())

app.use('/api/auth', userRoute)
app.use('/api/sauce', sauceRoute)

app.get('/', (req, res) => {
    res.write('Homepage')
    res.end()
})

export default app