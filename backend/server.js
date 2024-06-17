import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.routes.js'
import messageRouter from './routes/message.routes.js'
import userRouter from './routes/user.routes.js'
import connectToMongodb from './db/connectToMongodb.js'
import { app, server } from './socket/socket.js'

dotenv.config()
const PORT = process.env.PORT || 3000

const __dirname = path.resolve()

app.use(express.json()) //to parse the incoming request body with JSON payload
app.use(cookieParser()) //to parse the cookie in the protect route middleware used for authenticating user



app.use('/api/auth', authRouter)
app.use('/api/messages', messageRouter)
app.use('/api/users', userRouter)

app.use(express.static(path.join(__dirname, '/frontend/dist')))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'))
})

server.listen(PORT, () => {
  connectToMongodb() 
  console.log(`server is running on port: ${PORT}`)
})
