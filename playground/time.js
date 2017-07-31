var moment = require('moment');

var x = new Date().getTime()

var date = moment(x) ;
// date.add(1, 'year');

console.log(x)
console.log(date.format('HH:mm, MMM Do, YYYY'))
console.log(date.utc().format('h:mm a'))
