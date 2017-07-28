var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var text = 'text test';
    var from = 'from test';

    var result = generateMessage(from, text);

    // expect(result.from).toBe(from);
    // expect(result.text).toBe(text);
    expect(result).toInclude({from, text});
    expect(result.createdAt).toBeA('number');

  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'generateLocationMessage from';
    var lat = 1.0;
    var long = -1.00;

    var result = generateLocationMessage(from, lat, long);

    var url = `https://www.google.com/maps?q=${lat},${long}` ;

    expect(result).toInclude({from, url});
    expect(result.createdAt).toBeA('number');

  });
});
