
var socket = io() ;

function scrollToBottom() {
  // selectors
  var messages = jQuery('#messages');

  var newMessage = messages.children('li:last-child');

  // heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  //
  console.log('clientHeight:', clientHeight, ' scrollTop:', scrollTop, ' newMessageHeight:',
    newMessageHeight, ' lastMessageHeight:', lastMessageHeight, ' scrollHeight:', scrollHeight);

  if ( (clientHeight + scrollTop + newMessageHeight + lastMessageHeight ) >= scrollHeight) {
    console.log('scroll!')
    messages.scrollTop(scrollHeight);
  }

}

socket.on('connect', () => {
  console.log('connected to server');
})

socket.on('disconnect', () => {
  console.log('disconnected from server')
})

socket.on('newMessage', (data) => {
  var formattedTime = moment(data.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();

  var html = Mustache.render(template, {
    text: data.text,
    from: data.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);

  scrollToBottom();

})

socket.on('newLocationMessage', (data) => {
  var formattedTime = moment(data.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();

  var html = Mustache.render(template, {
    url: data.url,
    from: data.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);

  scrollToBottom();

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
