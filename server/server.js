const path = require('path')
const express = require('express')
const socketIO = require('socket.io');
const http = require('http');

//
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');

//
const publicPath = path.join(__dirname, '../public')
console.log(publicPath);

const app = express();
const port = process.env.PORT || 3000 ;

var server = http.createServer(app) ;
var io = socketIO(server) ;

//
app.use(express.static(publicPath));

//
io.on('connection', (socket) => {
    console.log("user connection created ");

    socket.emit('newMessage', generateMessage("Admin", "Welcome, new user!" ) ) ;

    socket.broadcast.emit('newMessage', generateMessage("Admin", "A new user has joined"));

    socket.on('join', (params, callback) => {
      if (! isRealString(params.name) || ! isRealString(params.room) ) {
          callback('Name and room name are required.')
      }

      callback();

    })

    socket.on('createMessage', (data, callback) => {
      console.log('createMessage received by server - data:'+ JSON.stringify(data));

      io.emit('newMessage', generateMessage(data.from, data.text));

      callback('This is from server');

    });

    socket.on('createLocationMessage', (coords) => {
      console.log('createLocationMessage received by server - data:'+ JSON.stringify(coords));

      // io.emit('newMessage', generateMessage('Admin', `${coords.latitude}, ${coords.longitude}`));
      io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude ));

    });

    socket.on('disconnect', () => {
      console.log('disconnected from client')
    })
});

//
server.listen(port , () => {
  console.log(`started on port ${port}`)
})

module.exports = { app }
