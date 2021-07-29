import {
  expect
} from 'chai';
import {
  userData
} from '../src/data/users.js';


import UserRepo from '../src/User-repo';
import User from '../src/User';

describe('User', function() {
  let user, userRepo, instance;

  beforeEach(() => {
    user = new User(userData[0])
    instance = userData.map(user => new User(user))
    userRepo = new UserRepo(instance)

  });

  it('Should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('Should be an instance of User', () => {
    expect(user).to.be.an.instanceof(User);
  });

  it('should take a user data object', () => {
    expect(user.id).to.equal(1);
    expect(user.name).to.equal('Luisa Hane');
  });

  it('Should return user first name', () => {
    expect(user.getFirstName()).to.equal("Luisa");
  });

  it('Should return list of friend names from user repository', () => {
    expect(user.getFriendsNames(userRepo.users)).to.deep.equal(["Mae Connelly", "Laney Abshire", "Garnett Cruickshank"]);
  });
});