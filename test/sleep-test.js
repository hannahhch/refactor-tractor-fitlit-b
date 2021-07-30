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


describe.only('Sleep', () => {
  let sleep, users, userRepo

  beforeEach(() => {
    sleep = new Sleep(sleepData[0])
    users = userData.map(user => new User(user))
    userRepo = new UserRepo(users);

  });

  it('Should be a function', () => {
    expect(Sleep).to.be.a('function')
  });

  it('Should be instance of the Sleep', () => {
    expect(sleep).to.be.instanceof(Sleep)
  })
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

  it('Should find the sleep quality for a user on a specified date', () => {
    expect(sleep.calculateDailySleepQuality(sleepData, "2019/06/15")).to.equal(2.2);
  });

  it('Should find sleep by day for that days week', () => {
    expect(sleep.calculateWeekSleep('2019/06/15', sleepData, userRepo)[0]).to.equal('2019/06/15: 6.1');
  });

  it('Should find sleep quality by day for that days week', () => {
    expect(sleep.calculateWeekSleepQuality('2019/06/15', sleepData, userRepo)[0]).to.equal('2019/06/15: 2.2');
  });

  it('Should determine the best quality sleepers for a week', () => {
    expect(sleep.determineBestSleepers("2019/06/15", sleepData, userRepo).length).to.equal(0);
  });

  it('Should return person with best quality sleep for the week', () => {
    expect(sleep.determineSleepWinnerForWeek("2019/06/15", sleepData, userRepo)).to.deep.equal(["Luisa Hane"]);
  });

  it('Should return all qualifying users if best quality sleep is a tie', () => {
    userRepo = new UserRepo(users);
    expect(sleep.determineSleepWinnerForWeek("2019/06/21", sleepData, userRepo)).to.deep.equal(["Luisa Hane"]);
  });

  it('Should return person with longest sleep for the day', () => {
    expect(sleep.determineSleepHoursWinnerForDay('2019/06/15', sleepData, userRepo)).to.deep.equal(["Luisa Hane"]);
  });

  it('Should return all qualifying users if longest sleep is a tie', () => {
    expect(sleep.determineSleepHoursWinnerForDay('2019/06/15', sleepData, userRepo)).to.deep.equal(["Luisa Hane"]);
  });
});