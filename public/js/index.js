
var socket = io() ;

socket.on('connect', () => {
  console.log('connected to server');
})

socket.on('disconnect', () => {
  console.log('disconnected from server')
})

socket.on('newMessage', (data) => {
  console.log('newMessage received by client - data:'+ JSON.stringify(data));

  var formattedTime = moment(data.createdAt).format('h:mm a');

  var li = jQuery('<li></li>');
  li.text(`[${formattedTime}] ${data.from}: ${data.text}`);

  jQuery('#messages').append(li);
})

socket.on('newLocationMessage', (data) => {
  console.log('newLocationMessage received by client - data:'+ JSON.stringify(data));

  var formattedTime = moment(data.createdAt).format('h:mm a');

  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>')

  li.text(`[${formattedTime}] ${data.from}: `);
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

  var messageTextbox = jQuery('[name=message]') ;

  socket.emit('createMessage', {
    from: "Liv",
    text: messageTextbox.val()
  }, function (data) {
    // console.log("#message-form:socket.emit('createMessage') callback fired in client - data:", data )
    messageTextbox.val('').focus();
  })
});


var locationButton = jQuery('#send-location');

locationButton.on('click', function() {
  console.log("<debug1>");

  if (!navigator.geolocation) {
    return alert('Browser does not support Geolocation');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');
  jQuery('[name=message]').focus();

  navigator.geolocation.getCurrentPosition(function (position) {
    // console.log("position:", position);
    locationButton.removeAttr('disabled').text('Send Location');

    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });

  }, function () {
    locationButton.removeAttr('disabled').text('Send Location');

    alert('Unable to getCurrentPosition');
  });
});
