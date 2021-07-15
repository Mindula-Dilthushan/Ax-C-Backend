const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const PORT = process.env.PORT || 5000;

const router = require('./router');
const { use } = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    console.log('We Have a New Connection.......');

    socket.on('join', ({ name, room }, callback) => {
       const { error, user } = addUser({ id: socket.id, name, room });
       if(error) return callback(error);

       socket.emit('message', {text: `${user.name}, Welcome to the Ax-C Chat ${user.room}`});
       socket.broadcast.to(user.room).emit('message', {text: `${user.name}, has joined Ax-C Chat `});

       socket.join(user.room);

       io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)})

       callback();
    });

    socket.on('sendMessage', (message, callback) =>{
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text:message});
        io.to(user.room).emit('roomdata', { room: user.room, users: getUsersInRoom(user.room)});

        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        if(user){
            io.to(user.room).emit('message', { text: `${user.name} has left Ax-C Chat` });
        }
    })
});



app.use(router);

server.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`)
});

