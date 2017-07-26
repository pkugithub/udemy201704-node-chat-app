const path = require('path')
const express = require('express')
const socketIO = require('socket.io');
const http = require('http');

//
const {generateMessage} = require('./utils/message');

//
const publicPath = path.join(__dirname, '../public')
console.log(publicPath);

const app = express();
const port = process.env.PORT || 3000 ;

var server = http.createServer(app) ;
var io = socketIO(server) ;

//
app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log("user connection created ");

    socket.emit('newMessage', generateMessage("Admin", "Welcome, new user!" ) ) ;

    socket.broadcast.emit('newMessage', generateMessage("Admin", "A new user has joined"));

    socket.on('createMessage', (data) => {
      console.log('createMessage received by server - data:'+ JSON.stringify(data));

      io.emit('newMessage', generateMessage(data.from, data.text));

    })

    socket.on('disconnect', () => {
      console.log('disconnected from client')
    })
});

//
server.listen(port , () => {
  console.log(`started on port ${port}`)
})

module.exports = { app }
