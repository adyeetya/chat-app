import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.routes.js'
import messageRouter from './routes/message.routes.js'
import userRouter from './routes/user.routes.js'
import connectToMongodb from './db/connectToMongodb.js'
import { app, server } from './socket/socket.js'

dotenv.config()
const PORT = process.env.PORT || 3000



app.use(express.json()) //to parse the incoming request body with JSON payload
app.use(cookieParser()) //to parse the cookie in the protect route middleware used for authenticating user

app.get('/', (req, res) => {
  res.send('hello world')
})

app.use('/api/auth', authRouter)
app.use('/api/messages', messageRouter)
app.use('/api/users', userRouter)

server.listen(PORT, () => {
  connectToMongodb()
  console.log(`server is running on port: ${PORT}`)
})
