const express = require('express')
const socketio = require('socket.io')
const http = require('http')

const {
    saveUser,
    deleteUser,
    getUser,
    getUsersInChat
} = require('./controller/User')

const PORT = process.env.PORT || 8000

const router = require('./router/UserRoute')
const { use } = require('./router/UserRoute')

const app = express();
const server = http.createServer(app)
const io = socketio(server)

io.on('connection', (socketio) => {
    console.log('New Connection . . . !')

})