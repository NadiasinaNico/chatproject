const express = require('express');
const path = require('path');
const http = require('http');
const app = express();
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');

const server = http.createServer(app);
const io = socketio(server);
const botName = 'ChatBoard ';

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
  
  socket.emit('message', 'Welcome to chatCord!');
  socket.broadcast.emit('message', formatMessage(botName,'A user has joined the chat'));
  socket.on('disconnect', () => {
    io.emit('message', formatMessage(botName, 'A user has left the chat'));
  });

socket.on('chatMessage', msg => {
  io.emit('message',formatMessage('USER', msg));
});
});

const PORT = 3000 || process.env.PORT;
server.listen(PORT, () =>  
console.log(`Server running on port ${PORT}`));