import {
  expect
} from 'chai';

import Sleep from '../src/Sleep';
import UserRepo from '../src/User-repo';
import User from '../src/User';

import {
  sleepData
} from '../src/data/sampleData';
import {
  userData
} from '../src/data/users.js';


describe.only('Sleep', function() {
  let sleep, user, userRepo

  beforeEach(function() {
    sleep = new Sleep(sleepData)
    user = userData.map(user => new User(user))
    // console.log(user)
    userRepo = new UserRepo(user);
    // console.log(userRepo)
  });

  it('Should be a function', () => {
    expect(Sleep).to.be.a('function')
  });

  it('Should have an ID', () => {
    expect(sleep.id).to.equal(sleepData[0].userID)
  });

  it('Should have property of hours slept', () => {
    expect(sleep.hoursSlept).to.equal(sleepData[0].hoursSlept)
  });

  it('Should have propety of sleep quality', () => {
    expect(sleep.sleepQuality).to.equal(sleepData[0].sleepQuality)
  });

  it('Should have property of current date', () => {
    expect(sleep.date).equal(sleepData[0].date)
  });

  it('Should find the average sleep hours per day for a user', () => {
    expect(sleep.calculateAverageSleep(sleepData)).to.equal(8);
  });

  it('Should find the average sleep quality per day for a user', () => {
    expect(sleep.calculateAverageSleepQuality(sleepData)).to.equal(2);
  });

  it('Should find the sleep hours for a user on a specified date', () => {
    expect(sleep.calculateDailySleep(sleepData, "2019/06/15")).to.equal(6.1);
  });

  it('Should find the sleep quality for a user on a specified date', function() {
    expect(sleep.calculateDailySleepQuality(sleepData, "2019/06/15")).to.equal(2.2);
  });
  //
  // it('should find sleep by day for that days week', function() {
  //
  //   expect(sleep.calculateWeekSleep('2019/06/18', 4, userRepo)[0]).to.eql('2019/06/18: 7.9');
  //   expect(sleep.calculateWeekSleep('2019/06/18', 4, userRepo)[6]).to.eql('2017/06/15: 5.4');
  // })
  //
  // it('should find sleep quality by day for that days week', function() {
  //
  //   expect(sleep.calculateWeekSleepQuality('2019/06/18', 4, userRepo)[0]).to.eql('2019/06/18: 1.6');
  //   expect(sleep.calculateWeekSleepQuality('2019/06/18', 4, userRepo)[6]).to.eql('2017/06/15: 3');
  // })
  // it('should determine the best quality sleepers for a week', function() {
  //
  //   expect(sleep.determineBestSleepers("2019/06/21", userRepo)).to.eql(["Allie McCarthy", "Bugs Bunny"]);
  // })
  // it('should return person with best quality sleep for the week', function() {
  //
  //   expect(sleep.determineSleepWinnerForWeek("2019/06/21", userRepo)).to.eql(["Bugs Bunny"]);
  // })
  // it('should return all qualifying users if best quality sleep is a tie', function() {
  //   sleepData = sleepData.push({
  //     "userID": 6,
  //     "date": "2019/06/15",
  //     "hoursSlept": 9,
  //     "sleepQuality": 4
  //   })
  //   let user6 = new User({
  //     id: 6,
  //     name: "Richmond",
  //     address: "1234 Looney Street, Denver CO 80301-1697",
  //     email: "BugsB1@hotmail.com",
  //     strideLength: 3.8,
  //     dailyStepGoal: 7000,
  //     friends: [1, 2, 3]
  //   });
  //   users = [user1, user2, user3, user4, user5, user6];
  //   userRepo = new UserRepo(users);
  //
  //   expect(sleep.determineSleepWinnerForWeek("2019/06/21", userRepo)).to.eql(["Bugs Bunny", "Richmond"]);
  // })
  //
  // it('should return person with longest sleep for the day', function() {
  //
  //   expect(sleep.determineSleepHoursWinnerForDay('2019/06/21', userRepo)).to.eql(["Bugs Bunny"]);
  // })
  // it('should return all qualifying users if longest sleep is a tie', function() {
  //   sleepData = sleepData.push({
  //     "userID": 6,
  //     "date": "2019/06/21",
  //     "hoursSlept": 9,
  //     "sleepQuality": 4
  //   })
  //   let user6 = new User({
  //     id: 6,
  //     name: "Richmond",
  //     address: "1234 Looney Street, Denver CO 80301-1697",
  //     email: "BugsB1@hotmail.com",
  //     strideLength: 3.8,
  //     dailyStepGoal: 7000,
  //     friends: [1, 2, 3]
  //   });
  //   users = [user1, user2, user3, user4, user5, user6];
  //   userRepo = new UserRepo(users);
  //
  //   expect(sleep.determineSleepHoursWinnerForDay('2019/06/21', userRepo)).to.eql(["Bugs Bunny", "Richmond"]);
  // })
  // //make this test fail when user is NOT best in week
});