require('express-async-errors')
const express = require('express')
const cors = require('cors')
const connectDB = require('./src/config/db')
require('dotenv').config()

const app = express()

connectDB()

app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

app.use('/api/auth', require('./src/routes/authRoutes'))
app.use('/api/users', require('./src/routes/userRoutes'))
app.use('/api/posts', require('./src/routes/postRoutes'))
app.use('/api/likes', require('./src/routes/likeRoutes'))
app.use('/api/comments', require('./src/routes/commentRoutes'))
app.use('/api/search', require('./src/routes/searchRoutes'))
app.use('/api/follow', require('./src/routes/followRoutes'))



app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ message: err.message })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`)
})