import express from 'express'
import helmet from 'helmet'
import dotenv from 'dotenv'
import loggerMiddleware from './middlewares/logger-middleware.js'
import { swaggerUi, swaggerConfig } from './middlewares/swagger.js'
import mongoDb from './config/Database.js'
import userRoute from './routes/userRoute.js'
import sauceRoute from './routes/sauceRoute.js'

const app = express()
const jsDocHelmetOptions = {
    useDefaults: true,
    directives: {
        scriptSrc: ["'self'", "'unsafe-inline'"]
    }
}

dotenv.config({ path: './.env' })
mongoDb.connection()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN)
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
})

app.use(express.json())

app.use(helmet())
app.use(loggerMiddleware)

app.use('/images', express.static('./images'))


app.use('/api/auth', userRoute)
app.use('/api/sauces', sauceRoute)

if (process.env.NODE_ENV === 'development') {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig))
    app.use('/jsdoc', helmet.contentSecurityPolicy(jsDocHelmetOptions), express.static('./docs/jsdoc'))

    app.get('/', (req, res) => {
        res.status(301).redirect('/api-docs')
    })
} else {
    app.get('/', (req, res) => {
        res.status(200)
        res.end()
    })
}

export default app