const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
  var users ;

  beforeEach( () => {
    users = new Users() ;

    users.users = [{
      id: '1',
      name: 'Test User #1',
      room: 'Node Course'
    }, {
      id: '2',
      name: 'Test User #2',
      room: 'React Course'
    }, {
      id: '3',
      name: 'Test User #3',
      room: 'Node Course'
    }]
  });

  it('should add new user', () => {
    var users = new Users();

    var user = {
      id: '123',
      name: 'katie',
      room: 'bedroom'
    }

    var reUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);

  });

  it('should return names for node course', () => {
    var userList = users.getUserList('Node Course');

    expect(userList).toEqual(['Test User #1', 'Test User #3']);
  });

  it('should return names for react course', () => {
    var userList = users.getUserList('React Course');

    expect(userList).toEqual(['Test User #2']);
  });


  it('should remove a user', () => {
    var index = 1 ;
    var userToBeRemoved = users.users[index]
    var removedUser = users.removeUser(userToBeRemoved.id);

    expect(removedUser).toEqual(userToBeRemoved) ;
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user', () => {
    var removedUser = users.removeUser('112');

    expect(removedUser).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    var index = 2 ;
    var foundUser = users.getUser(users.users[index].id);

    expect(foundUser).toEqual(users.users[index]) ;

  });

  it('should not find user', () => {
    var foundUser = users.getUser('345');

    expect(foundUser).toNotExist();

  });
})
