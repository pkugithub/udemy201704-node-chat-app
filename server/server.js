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

    socket.on('disconnect', () => {
      console.log('disconnected from client')
    })
});

//
server.listen(port , () => {
  console.log(`started on port ${port}`)
})

module.exports = { app }
