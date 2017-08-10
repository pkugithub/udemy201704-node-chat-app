const path = require('path')
const express = require('express')
const socketIO = require('socket.io');
const http = require('http');

//
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

//
const publicPath = path.join(__dirname, '../public')
console.log(publicPath);

const app = express();
const port = process.env.PORT || 3000 ;

var server = http.createServer(app) ;
var io = socketIO(server) ;
var users = new Users();

//
app.use(express.static(publicPath));

//
io.on('connection', (socket) => {
    console.log("user connection created ");

    socket.on('join', (params, callback) => {
      if (! isRealString(params.name) || ! isRealString(params.room) ) {
          return callback('Name and room name are required.')
      }

      socket.join(params.room);

      users.removeUser(socket.id); // hmmm, why not allow a user to join multiple rooms?
      users.addUser(socket.id, params.name, params.room);

      io.to(params.room).emit('updateUserList', users.getUserList(params.room));

      socket.emit('newMessage', generateMessage("Admin", `Hi ${params.name}, welcome to room "${params.room}"`   ) ) ;

      socket.broadcast.to(params.room).emit('newMessage', generateMessage("Admin", `${params.name} has joined.`));

      callback();

    })

    socket.on('createMessage', (data, callback) => {
      var user = users.getUser(socket.id);

      if (user && isRealString(data.text)) {
        io.to(user.room).emit('newMessage', generateMessage(user.name, data.text));
      }

      callback('This is from server');

    });

    socket.on('createLocationMessage', (coords) => {
      var user = users.getUser(socket.id);

      if (user && coords) {
        io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude ));
      }
    });

    socket.on('disconnect', () => {
      var user = users.removeUser(socket.id);

      if (user) {
        io.to(user.room).emit('updateUserList', users.getUserList(user.room));
        io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room`));
      }
    });


});

//
server.listen(port , () => {
  console.log(`started on port ${port}`)
})

module.exports = { app }
