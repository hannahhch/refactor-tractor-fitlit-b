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


describe.only('Hydration', () => {
  let hydration;

  beforeEach(() => {
    hydration = new Hydration(hydrationData);
    // console.log(hydration)
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

  it('Should find the average water all times for a user', function() {
    expect(hydration.calculateAverageOunces(hydrationData)).to.equal(65);
  });

  it('should find the water intake for a user on a specified date', function() {
    expect(hydration.calculateDailyOunces(hydrationData, "2019/06/15")).to.equal(37);
  });

  // it('should find water intake by day for first week', function() {
  //   const user3 = new User({
  //     id: 3,
  //     name: "The Rock",
  //     address: "1236 Awesome Street, Denver CO 80301-1697",
  //     email: "therock@hotmail.com",
  //     strideLength: 10,
  //     dailyStepGoal: 60000,
  //     friends: [1, 2, 4]
  //   });
  //
  //   const user4 = new User({
  //     id: 4,
  //     name: "Rainbow Dash",
  //     address: "1237 Equestria Street, Denver CO 80301-1697",
  //     email: "rainbowD1@hotmail.com",
  //     strideLength: 3.8,
  //     dailyStepGoal: 7000,
  //     friends: [1, 2, 3]
  //   });
  //   const users = [user3, user4];
  //   const userRepo = new UserRepo(users);
  //   // console.log(hydration.calculateFirstWeekOunces(userRepo, 4));
  //   expect(hydration.calculateFirstWeekOunces(userRepo, 4)[0]).to.eql('2019/09/20: 40');
  //   expect(hydration.calculateFirstWeekOunces(userRepo, 4)[6]).to.eql('2019/04/15: 36');
  // });
  //
  // it('should find sleep quality by day for that days week', function() {
  //   const user3 = new User({
  //     id: 3,
  //     name: "The Rock",
  //     address: "1236 Awesome Street, Denver CO 80301-1697",
  //     email: "therock@hotmail.com",
  //     strideLength: 10,
  //     dailyStepGoal: 60000,
  //     friends: [1, 2, 4]
  //   });
  //
  //   const user4 = new User({
  //     id: 4,
  //     name: "Rainbow Dash",
  //     address: "1237 Equestria Street, Denver CO 80301-1697",
  //     email: "rainbowD1@hotmail.com",
  //     strideLength: 3.8,
  //     dailyStepGoal: 7000,
  //     friends: [1, 2, 3]
  //   });
  //   const users = [user3, user4];
  //   const userRepo = new UserRepo(users);
  //   console.log("HELOOO", hydration.calculateRandomWeekOunces('2018/02/01', 4, userRepo));
  //   expect(hydration.calculateRandomWeekOunces('2019/09/18', 4, userRepo)[0]).to.eql('2019/09/18: 40');
  //   // expect(hydration.calculateRandomWeekOunces('2018/02/01', 4, userRepo)[6]).to.eql('2019/09/16: 30');
  //   //this is failing because it doesn't exist, need a failure case
  // })
  // //day of hydration should not include user 2 or user 1 on August 22
  // //week of hydration should not include user 4 not during the week

});