
var socket = io() ;

socket.on('connect', () => {
  console.log('connected to server');
})

socket.on('disconnect', () => {
  console.log('disconnected from server')
})

socket.on('newMessage', (data) => {
  console.log('newMessage received by client - data:'+ JSON.stringify(data));

  var li = jQuery('<li></li>');
  li.text(`[${data.createdAt}] ${data.from}: ${data.text}`);

  jQuery('#messages').append(li);
})

// // -- adhoc test code
// socket.emit('createMessage', {
//   from: "katie",
//   text: "test message subject #1 created by client"
// }, function (data) {
//   console.log("socket.emit('createMessage') callback fired in client - data:", data )
// })

jQuery('#message-form').on('submit', function (e) {
  console.log('#message-form>submit fired')

  e.preventDefault();

  socket.emit('createMessage', {
    from: "Liv",
    text: jQuery('[name=message]').val()
  }, function (data) {
    console.log("#message-form:socket.emit('createMessage') callback fired in client - data:", data )
  })
});
