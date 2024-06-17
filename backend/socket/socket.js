// Socket.IO requires an HTTP server to attach itself to. By creating an HTTP server and passing the Express app as the request handler, you can integrate Socket.IO with your Express application.
// This allows you to use the same server for both HTTP and WebSocket communication.

import { Server } from 'socket.io' // Importing the Socket.IO Server class
import http from 'http' // Importing the HTTP module
import express from 'express' // Importing the Express framework

const app = express() // This line creates an instance of an Express application. The app object will be used to define routes, middleware, and other HTTP-related functionality.

const server = http.createServer(app) // Creating an HTTP server using the Express application
// This line creates an HTTP server using the Node.js http module and passes the Express app as the request handler. This means the HTTP server will use the Express application to handle incoming HTTP requests.
// By doing this, you create a single server instance that can handle both HTTP requests and WebSocket connections.

const io = new Server(server, {
  // You create a Socket.IO server instance (io) and attach it to the HTTP server. This allows Socket.IO to handle WebSocket connections on the same server that handles HTTP requests.
  cors: {
    // Configuring CORS (Cross-Origin Resource Sharing) to allow connections from specified origins
    origin: ['http://localhost:3000'], // Allowing requests from 'http://localhost:3000'
    methods: ['GET', 'POST'], // Allowing 'GET' and 'POST' methods
  },
})

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId]
}

const userSocketMap = {} // {userId: socketId}

io.on('connection', (socket) => {
  // When a new user connects, their socket ID is received
  console.log('a user connected', socket.id)
  const userId = socket.handshake.query.userId
  //   The userId is extracted from the query parameters of the WebSocket handshake. This assumes the client includes the userId in the connection request.

  if (userId != 'undefined') {
    userSocketMap[userId] = socket.id
    console.log('userSocketMap', userSocketMap)
    // If userId is valid, it maps the userId to the socket.id in userSocketMap. This helps in identifying which user is connected via which socket.
  }

  io.emit('getOnlineUsers', Object.keys(userSocketMap))
  //   After a new user connects, the server emits the getOnlineUsers event to all clients. This event contains the list of currently connected users.

  //   socket.on() is used to listen for events emitted by the client in server and server in the client. The first argument is the event name, and the second argument is a callback function that will be executed when the event is emitted.
  socket.on('disconnect', () => {
    // When a user disconnects, this event is triggered
    console.log('user disconnected', socket.id)
    delete userSocketMap[userId]
    io.emit('getOnlineUsers', Object.keys(userSocketMap))
    // Emit an event to all clients with the updated list of online users
  })
})

export { app, io, server } // Exporting the Express app, Socket.IO instance, and HTTP server
