
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

socket.on('newLocationMessage', (data) => {
  console.log('newLocationMessage received by client - data:'+ JSON.stringify(data));

  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>')

  li.text(`[${data.createdAt}] ${data.from}: `);
  a.attr('href', data.url);

  li.append(a);
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

var locationButton = jQuery('#send-location');

locationButton.on('click', function() {
  console.log("<debug1>");

  if (!navigator.geolocation) {
    return alert('Browser does not support Geolocation');
  }

  navigator.geolocation.getCurrentPosition(function (position) {
    console.log("position:", position);

    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });

  }, function () {
    alert('Unable to getCurrentPosition');
  });
});
