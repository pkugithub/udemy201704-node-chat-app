
var socket = io() ;

socket.on('connect', () => {
  console.log('connected to server');

  // socket.emit('createMessage', {
  //   from: "katie",
  //   to: "pei",
  //   text: "test message subject #1 created by client"
  // })
})

socket.on('disconnect', () => {
  console.log('disconnected from server')
})

socket.on('newMessage', (data) => {
  console.log('newMessage received by client - data:'+ JSON.stringify(data));
})
