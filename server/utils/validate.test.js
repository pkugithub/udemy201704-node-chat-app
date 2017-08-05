var expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () => {
  it('should reject non-string values', () => {
    var val = 123 ;

    var result = isRealString(val);

    expect(result).toBe(false) ;
  });

  it('should reject string with only spaces', () => {
    var val = '     ' ;

    var result = isRealString(val);

    expect(result).toBe(false) ;
  });

  it('should allow string with non-space characters', () => {
    var val = 'good string it is' ;

    var result = isRealString(val);

    expect(result).toBe(true) ;
  });

});
