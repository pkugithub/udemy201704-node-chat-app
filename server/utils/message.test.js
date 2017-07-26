var expect = require('expect');

var {generateMessage} = require('./message');

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
})
