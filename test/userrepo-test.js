import {
  expect
} from 'chai';

import {
  userData
} from '../src/data/users.js';

import {
  hydrationData,
  sleepData
} from '../src/data/sampleData';

import UserRepo from '../src/User-repo';
import User from '../src/User';


describe.only('User Repo', () => {

  let users;
  let userRepo;

  beforeEach(() => {
    users = userData.map(user => new User(user))
    userRepo = new UserRepo(users);
  });

  it('Should be a function', () => {
    expect(UserRepo).to.be.a('function');
  });

  it('Takes an array of user data', () => {
    expect(userRepo.users).to.deep.equal(users);
  });

  it('Should have a parameter to take in user data', () => {
    expect(userRepo.users[0].id).to.equal(1);
  });

  it('Should return user data when given user ID', () => {
    expect(userRepo.getDataFromID(1)).to.eql(userData[0].id);
  });

  it('Should return the average of all users step goals', () => {
    expect(userRepo.calculateAverageStepGoal()).to.equal(6700);
  });

  it('Should get a users data from its userID in any data set', () => {
    expect(userRepo.getDataFromUserID(1, hydrationData).length).to.equal(7);
  });

  it('Should get a users most recent date using the app', () => {
    expect(userRepo.getToday(1, hydrationData)).to.equal('2019/06/21');
  });

  it('Should sort data by date and extract its week', () => {
    expect(userRepo.getFirstWeek(1, hydrationData)[3].date).to.equal("2019/06/18");
  });

  it('Should get a sorted week of data for a single user from a date', () => {
    expect(userRepo.getWeekFromDate('2019/06/17', 1, hydrationData)[0].date).to.equal("2019/06/17");
  });

  it('Should get a week of data for all users in data set', () => {
    expect(userRepo.chooseWeekDataForAllUsers(hydrationData, '2019/06/17')[0].date).to.equal("2019/06/15");
  });

  it('Should get a day of data for all users in data set', () => {
    expect(userRepo.chooseDayDataForAllUsers(sleepData, '2019/06/15')[0].date).to.equal('2019/06/15');
  });

  it('Should isolate a user ID and its values of any relevant data', () => {
    expect(userRepo.isolateUsernameAndRelevantData(sleepData, "2019/06/21", 'sleepQuality', userRepo.chooseWeekDataForAllUsers(sleepData, "2019/06/21"))).to.eql({
      '1': [2.2, 3.8, 2.6, 3.1, 1.2, 1.2, 4.2]
    })
  });

  it('Should rank user ids according to relevant data value averages', () => {
    expect(userRepo.rankUserIDsbyRelevantDataValue(sleepData, "2019/06/21", 'sleepQuality', userRepo.chooseWeekDataForAllUsers(sleepData, "2019/06/21"))).to.deep.equal(['1'])
  });

  it('Should show list in order of userID and average of relevant value', () => {
    expect(userRepo.combineRankedUserIDsAndAveragedData(sleepData, "2019/06/21", 'sleepQuality', userRepo.chooseWeekDataForAllUsers(sleepData, "2019/06/21"))[0]).to.deep.equal({
      '1': 2
    })
  });
});