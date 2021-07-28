import {
  expect
} from 'chai';
import Hydration from '../src/Hydration';
import UserRepo from '../src/User-repo';
import User from '../src/User';
import {
  activityData,
  hydrationData,
  sleepData
} from '../src/data/sampleData';
import {
  userData,
} from '../src/data/users.js';

describe.only('Hydration', () => {
  let hydration;

  beforeEach(() => {
    hydration = new Hydration(hydrationData);
  });

  it('Should be a function', () => {
    expect(Hydration).to.be.a('function')
  });

  it('Should be instance of Hydration', () => {
    expect(hydration).to.be.instanceof(Hydration)
  })

  it('Should take in user id', () => {
    expect(hydration.userID).to.equal(1);
  });

  it('Should have a date', () => {
    expect(hydration.date).to.equal(hydrationData[0].date);
  });

  it('Should have ounces of water consumed', () => {
    expect(hydration.numOunces).to.equal(hydrationData[0].numOunces);
  });

  it('Should find the average water all times for a user', () => {
    expect(hydration.calculateAverageOunces(hydrationData)).to.equal(65);
  });

  it('should find the water intake for a user on a specified date', function() {
    expect(hydration.calculateDailyOunces(hydrationData, "2019/06/15")).to.equal(37);
  });

  it('should find water intake by day for first week', () => {
    const userRepo = new UserRepo(userData);
    expect(hydration.calculateFirstWeekOunces(userRepo, hydrationData).length).to.equal(7);
  });

  it('Should find water intake by randomized week days', () => {
    const userRepo = new UserRepo(userData);
    expect(hydration.calculateRandomWeekOunces("2019/06/15", userRepo, hydrationData).length).to.equal(1);
  });
})