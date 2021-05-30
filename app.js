import express from 'express'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.write('Homepage')
    res.end()
})

export default app