const path = require('path')
const express = require('express')
const socketIO = require('socket.io');
const http = require('http');

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

    socket.emit('newMessage', {
      from: "Admin",
      text: "Welcome, new user!",
      createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage', {
      from: "Admin",
      text: "A new user has joined",
      createdAt: new Date().getTime()
    });

    socket.on('createMessage', (data) => {
      console.log('createMessage received by server - data:'+ JSON.stringify(data));

      io.emit('newMessage', {
        from: data.from,
        text: data.text,
        createdAt: new Date().getTime()
      });


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
