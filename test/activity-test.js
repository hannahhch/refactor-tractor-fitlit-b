import {
  expect
} from 'chai';
import {
  activityData
} from '../src/data/sampleData';

import {
  userData
} from '../src/data/users.js';

import Activity from '../src/Activity';
import UserRepo from '../src/User-repo';
import User from '../src/User';

describe('Activity', () => {
  let activity, users, userRepo;

  beforeEach(() => {
    activity = new Activity(activityData[0]);
    users = userData.map(user => new User(user));
    userRepo = new UserRepo(users);

  });

  it('Should be a function', () => {
    expect(Activity).to.be.a('function');
  });

  it('Should be instance of Activity', () => {
    expect(activity).to.be.instanceof(Activity);
  });

  it('Should have an ID', () => {
    expect(activity.userID).to.equal(activityData[0].userID)
  });

  it('Should have a current date', () => {
    expect(activity.date).to.equal(activityData[0].date);
  });

  it('Should have number of steps', () => {
    expect(activity.numSteps).to.equal(activityData[0].numSteps);
  });

  it('Should have minutes active', () => {
    expect(activity.minutesActive).to.equal(activityData[0].minutesActive);
  });

  it('Should have flightsOfStairs', () => {
    expect(activity.flightsOfStairs).to.equal(activityData[0].flightsOfStairs);
  });

  it('Should return the miles a given user has walked on a given date', () => {
    expect(activity.getMilesFromStepsByDate(activityData, "2019/06/15", userRepo.users[0])).to.equal(2.9);
  });

  it('Should return the number of minutes a given user was active for on a given day', () => {
    expect(activity.getActiveMinutesByDate(activityData, "2019/06/16")).to.equal(175);
  });

  it('should return average active minutes in a given week', () => {
    expect(activity.calculateActiveAverageForWeek(activityData, "2019/06/21", userRepo)).to.equal(171.1);
  });

  it('Should return true/false if the given user met their step goal on a given day', () => {
    expect(activity.accomplishStepGoal(activityData, "2019/06/15", userRepo.users[0])).to.equal(false);
  });

  it('should return all days that a given user exceeded their step goal', () => {
    expect(activity.getDaysGoalExceeded(activityData, userRepo.users[0])).to.deep.equal([
      '2019/06/17',
      '2019/06/20'
    ]);
  });

  it('Should return the highest number of stairs climbed in a day for all time', () => {
    expect(activity.getStairRecord(activityData)).to.equal(36);
  });

  it('Should return the average flight of stairs for all users on given day', () => {
    expect(activity.getAllUserAverageForDay(activityData, "2019/06/15", userRepo, "flightsOfStairs")).to.equal(16)
  });

  it('Should return average steps taken for given date for all users', function() {
    let activityDatas = [{
      "userID": 2,
      "date": "2019/06/23",
      "numSteps": 9000,
      "minutesActive": 21,
      "flightsOfStairs": 14
    }, {
      "userID": 3,
      "date": "2019/06/23",
      "numSteps": 2000,
      "minutesActive": 8,
      "flightsOfStairs": 9
    }];

    expect(activity.getAllUserAverageForDay(activityDatas, "2019/06/23", userRepo, "numSteps")).to.equal(5500)
  });

  it('Should return average minutes active given date for all users', function() {
    let activityDatas = [{
      "userID": 2,
      "date": "2019/06/23",
      "numSteps": 9000,
      "minutesActive": 21,
      "flightsOfStairs": 14
    }, {
      "userID": 3,
      "date": "2019/06/23",
      "numSteps": 2000,
      "minutesActive": 8,
      "flightsOfStairs": 9
    }];
    expect(activity.getAllUserAverageForDay(activityDatas, "2019/06/23", userRepo, "minutesActive")).to.equal(14.5)
  });

  it('Should return steps for given user on given date', () => {
    expect(activity.userDataForToday(activityData, "2019/06/15", userRepo, 'numSteps')).to.equal(3577);
  });

  it('Should return minutes active for given user on given date', () => {
    expect(activity.userDataForToday(activityData, "2019/06/15", userRepo, 'minutesActive')).to.equal(140);
  });

  it('Should return a weeks worth steps for a given user', () => {
    expect(activity.userDataForWeek(activityData, "2019/06/15", userRepo, 'numSteps')[0]).to.equal("2019/06/15: 3577");
  });

  it('Should return a weeks worth active minutes for a given user', () => {
    expect(activity.userDataForWeek(activityData, "2019/06/15", userRepo, 'minutesActive')[0]).to.equal("2019/06/15: 140");
  });

  it('Should return a weeks worth stairs for a given user', () => {
    expect(activity.userDataForWeek(activityData, "2019/06/15", userRepo, 'flightsOfStairs')[0]).to.equal("2019/06/15: 16");
  });
})

describe.only('Friend Activity', () => {
  let activity;
  let user4;
  let users;
  let userRepo;

  beforeEach(() => {
    activity = new Activity(activityData[0]);
    user4 = new User({
      id: 4,
      name: "Rainbow Dash",
      address: "1237 Equestria Street, Denver CO 80301-1697",
      email: "rainbowD1@hotmail.com",
      strideLength: 3.8,
      dailyStepGoal: 7000,
      friends: [1, 2]
    });
    users = userData.map(user => new User(user))
    userRepo = new UserRepo(users);
  });

  it('Should get a users friend lists activity', () => {
    expect(activity.getFriendsActivity(activityData, user4, userRepo).length).to.equal(7);
  });

  it('Should get a users ranked friendslist activity for a chosen week', () => {
    expect(activity.getFriendsAverageStepsForWeek(activityData, user4, "2019/06/15", userRepo)).to.deep.equal([{
      "1": 3577
    }]);
  });

  it('Should get a users ranked friendslist activity for a chosen week with names', () => {
    expect(activity.showChallengeListAndWinner(activityData, user4, "2019/06/15", userRepo)).to.deep.equal([
      "Luisa Hane: 3577"
    ])
  });

  it('Should know the ID of the winning friend', () => {
    expect(activity.getWinnerId(activityData, user4, "2019/06/15", userRepo)).to.equal(1)
  })

  it('Should show a 3-day increasing streak for a users step count', () => {
    expect(activity.getStreak(activityData, userRepo, 'numSteps')).to.deep.equal([])
  });

  it('should show a 3-day increasing streak for a users minutes of activity', () => {
    expect(activity.getStreak(activityData, userRepo, 'minutesActive')).to.deep.equal([])
  });
});