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

describe.only('Activity', () => {
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

  it('Should return true/false if the given user met their step goal on a given day', function() {
    expect(activity.accomplishStepGoal(activityData, "2019/06/15", userRepo.users[0])).to.equal(false);
  });
  //   it('should return all days that a given user exceeded their step goal', function() {
  //     expect(activity.getDaysGoalExceeded(1, userRepo.users[0])).to.eql([
  //       "2019/06/17",
  //       "2019/06/19",
  //       "2019/06/20",
  //       "2019/06/21",
  //       "2019/06/22",
  //       "2019/06/23"
  //     ]);
  //   });
  //   it('should return the highest number of stairs climbed in a day for all time', function() {
  //     expect(activity.getStairRecord(11)).to.eql(33);
  //   });
  //
  //   it('should return the average flight of stairs for all users on given day', function() {
  //     expect(activity.getAllUserAverageForDay("2019/06/15", userRepo, "flightsOfStairs")).to.eql(21.2)
  //   })
  //
  //   it('should return average steps taken for given date for all users', function() {
  //     activityData = activityData.push({
  //       "userID": 1,
  //       "date": "2019/06/23",
  //       "numSteps": 12000,
  //       "minutesActive": 13,
  //       "flightsOfStairs": 26
  //     }, {
  //       "userID": 2,
  //       "date": "2019/06/23",
  //       "numSteps": 9000,
  //       "minutesActive": 21,
  //       "flightsOfStairs": 14
  //     }, {
  //       "userID": 3,
  //       "date": "2019/06/23",
  //       "numSteps": 2000,
  //       "minutesActive": 8,
  //       "flightsOfStairs": 9
  //     });
  //     expect(activity.getAllUserAverageForDay("2019/06/23", userRepo, "numSteps")).to.eql(8000)
  //   });
  //
  //   it('should return average minutes active given date for all users', function() {
  //     activityData = activityData.push({
  //       "userID": 1,
  //       "date": "2019/06/23",
  //       "numSteps": 12000,
  //       "minutesActive": 13,
  //       "flightsOfStairs": 26
  //     }, {
  //       "userID": 2,
  //       "date": "2019/06/23",
  //       "numSteps": 9000,
  //       "minutesActive": 21,
  //       "flightsOfStairs": 14
  //     }, {
  //       "userID": 3,
  //       "date": "2019/06/23",
  //       "numSteps": 2000,
  //       "minutesActive": 8,
  //       "flightsOfStairs": 9
  //     });
  //     expect(activity.getAllUserAverageForDay("2019/06/23", userRepo, "minutesActive")).to.eql(12.5)
  //   });
  //
  //   it('should return steps for given user on given date', function() {
  //     expect(activity.userDataForToday(2, "2019/06/15", userRepo, 'numSteps')).to.eql(4294);
  //   });
  //   it('should return minutes active for given user on given date', function() {
  //     expect(activity.userDataForToday(1, "2019/06/18", userRepo, 'minutesActive')).to.eql(62);
  //   });
  //   it('should return a weeks worth steps for a given user', function() {
  //     expect(activity.userDataForWeek(1, "2019/06/23", userRepo, 'numSteps')[0]).to.eql("2019/06/23: 9000");
  //     expect(activity.userDataForWeek(1, "2019/06/23", userRepo, 'numSteps')[3]).to.eql("2019/06/20: 9303");
  //   });
  //   it('should return a weeks worth active minutes for a given user', function() {
  //     expect(activity.userDataForWeek(1, "2019/06/23", userRepo, 'minutesActive')[0]).to.eql("2019/06/23: 8");
  //     expect(activity.userDataForWeek(1, "2019/06/23", userRepo, 'minutesActive')[3]).to.eql("2019/06/20: 7");
  //   });
  //   it('should return a weeks worth stairs for a given user', function() {
  //     expect(activity.userDataForWeek(1, "2019/06/23", userRepo, 'flightsOfStairs')[0]).to.eql("2019/06/23: 9");
  //     expect(activity.userDataForWeek(1, "2019/06/23", userRepo, 'flightsOfStairs')[3]).to.eql("2019/06/20: 4");
  //   });
  // })
  //
  // describe('Friend Activity', function() {
  //   let activityData;
  //   let activity;
  //   let user1;
  //   let user2;
  //   let user3;
  //   let user4;
  //   let user5;
  //   let users;
  //   let userRepo;
  //
  //   beforeEach(function() {
  //     activityData = [{
  //         "userID": 1,
  //         "date": "2019/06/15",
  //         "numSteps": 3577,
  //         "minutesActive": 140,
  //         "flightsOfStairs": 16
  //       },
  //       {
  //         "userID": 2,
  //         "date": "2019/06/14",
  //         "numSteps": 4294,
  //         "minutesActive": 138,
  //         "flightsOfStairs": 10
  //       },
  //       {
  //         "userID": 3,
  //         "date": "2019/06/13",
  //         "numSteps": 7402,
  //         "minutesActive": 116,
  //         "flightsOfStairs": 33
  //       },
  //       {
  //         "userID": 4,
  //         "date": "2019/06/12",
  //         "numSteps": 3486,
  //         "minutesActive": 114,
  //         "flightsOfStairs": 32
  //       },
  //       {
  //         "userID": 1,
  //         "date": "2019/06/14",
  //         "numSteps": 11374,
  //         "minutesActive": 213,
  //         "flightsOfStairs": 13
  //       },
  //       {
  //         "userID": 2,
  //         "date": "2019/06/13",
  //         "numSteps": 14810,
  //         "minutesActive": 287,
  //         "flightsOfStairs": 18
  //       },
  //       {
  //         "userID": 3,
  //         "date": "2019/06/12",
  //         "numSteps": 2634,
  //         "minutesActive": 107,
  //         "flightsOfStairs": 5
  //       },
  //       {
  //         "userID": 4,
  //         "date": "2019/06/11",
  //         "numSteps": 10333,
  //         "minutesActive": 114,
  //         "flightsOfStairs": 31
  //       },
  //       {
  //         "userID": 1,
  //         "date": "2019/06/02",
  //         "numSteps": 6389,
  //         "minutesActive": 41,
  //         "flightsOfStairs": 33
  //       },
  //       {
  //         "userID": 2,
  //         "date": "2019/06/03",
  //         "numSteps": 8015,
  //         "minutesActive": 106,
  //         "flightsOfStairs": 37
  //       },
  //       {
  //         "userID": 3,
  //         "date": "2019/06/19",
  //         "numSteps": 11652,
  //         "minutesActive": 20,
  //         "flightsOfStairs": 24
  //       },
  //       {
  //         "userID": 4,
  //         "date": "2019/06/15",
  //         "numSteps": 9256,
  //         "minutesActive": 108,
  //         "flightsOfStairs": 2
  //       },
  //       {
  //         "userID": 1,
  //         "date": "2019/06/16",
  //         "numSteps": 3578,
  //         "minutesActive": 140,
  //         "flightsOfStairs": 16
  //       },
  //       {
  //         "userID": 1,
  //         "date": "2019/06/17",
  //         "numSteps": 3579,
  //         "minutesActive": 141,
  //         "flightsOfStairs": 16
  //       },
  //       {
  //         "userID": 1,
  //         "date": "2019/06/18",
  //         "numSteps": 3580,
  //         "minutesActive": 142,
  //         "flightsOfStairs": 16
  //       }
  //     ];
  //
  //     activity = new Activity(activityData);
  //
  //     user1 = new User({
  //       id: 1,
  //       name: "Alex Roth",
  //       address: "1234 Turing Street, Denver CO 80301-1697",
  //       email: "alex.roth1@hotmail.com",
  //       strideLength: 4.3,
  //       dailyStepGoal: 10000,
  //       friends: [2, 3, 4]
  //     });
  //
  //     user2 = new User({
  //       id: 2,
  //       name: "Allie McCarthy",
  //       address: "1235 Turing Street, Denver CO 80301-1697",
  //       email: "allie.mcc1@hotmail.com",
  //       strideLength: 3.3,
  //       dailyStepGoal: 9000,
  //       friends: [1, 3, 4]
  //     });
  //
  //     user3 = new User({
  //       id: 3,
  //       name: "The Rock",
  //       address: "1236 Awesome Street, Denver CO 80301-1697",
  //       email: "therock@hotmail.com",
  //       strideLength: 10,
  //       dailyStepGoal: 60000,
  //       friends: [1, 2, 4]
  //     });
  //
  //     user4 = new User({
  //       id: 4,
  //       name: "Rainbow Dash",
  //       address: "1237 Equestria Street, Denver CO 80301-1697",
  //       email: "rainbowD1@hotmail.com",
  //       strideLength: 3.8,
  //       dailyStepGoal: 7000,
  //       friends: [1, 2]
  //     });
  //     users = [user1, user2, user3, user4];
  //     userRepo = new UserRepo(users);
  //   });
  //
  //   it('should get a users friend lists activity', function() {
  //     expect(activity.getFriendsActivity(user4, userRepo)).to.eql([{
  //         "userID": 1,
  //         "date": "2019/06/15",
  //         "numSteps": 3577,
  //         "minutesActive": 140,
  //         "flightsOfStairs": 16
  //       },
  //       {
  //         "userID": 1,
  //         "date": "2019/06/14",
  //         "numSteps": 11374,
  //         "minutesActive": 213,
  //         "flightsOfStairs": 13
  //       },
  //       {
  //         "userID": 1,
  //         "date": "2019/06/02",
  //         "numSteps": 6389,
  //         "minutesActive": 41,
  //         "flightsOfStairs": 33
  //       },
  //       {
  //         "userID": 1,
  //         "date": "2019/06/16",
  //         "numSteps": 3578,
  //         "minutesActive": 140,
  //         "flightsOfStairs": 16
  //       },
  //       {
  //         "userID": 1,
  //         "date": "2019/06/17",
  //         "numSteps": 3579,
  //         "minutesActive": 141,
  //         "flightsOfStairs": 16
  //       },
  //       {
  //         "userID": 1,
  //         "date": "2019/06/18",
  //         "numSteps": 3580,
  //         "minutesActive": 142,
  //         "flightsOfStairs": 16
  //       },
  //       {
  //         "userID": 2,
  //         "date": "2019/06/14",
  //         "numSteps": 4294,
  //         "minutesActive": 138,
  //         "flightsOfStairs": 10
  //       },
  //       {
  //         "userID": 2,
  //         "date": "2019/06/13",
  //         "numSteps": 14810,
  //         "minutesActive": 287,
  //         "flightsOfStairs": 18
  //       },
  //       {
  //         "userID": 2,
  //         "date": "2019/06/03",
  //         "numSteps": 8015,
  //         "minutesActive": 106,
  //         "flightsOfStairs": 37
  //       }
  //     ]);
  //   });
  //
  //   it('should get a users ranked friendslist activity for a chosen week', function() {
  //     expect(activity.getFriendsAverageStepsForWeek(user4, "2019/06/15", userRepo)).to.eql([{
  //         '2': 9552
  //       },
  //       {
  //         '1': 7475.5
  //       }
  //     ]);
  //   });
  //
  //   it('should get a users ranked friendslist activity for a chosen week with names', function() {
  //     expect(activity.showChallengeListAndWinner(user4, "2019/06/15", userRepo)).to.eql([
  //       'Allie McCarthy: 9552', 'Alex Roth: 7475.5'
  //     ])
  //   });
  //   it('should know the ID of the winning friend', function() {
  //     expect(activity.getWinnerId(user4, "2019/06/15", userRepo)).to.eql(2)
  //   })
  //   it('should show a 3-day increasing streak for a users step count', function() {
  //     expect(activity.getStreak(userRepo, 1, 'numSteps')).to.eql(['2019/06/17', '2019/06/18'])
  //   });
  //   it('should show a 3-day increasing streak for a users minutes of activity', function() {
  //     expect(activity.getStreak(userRepo, 1, 'minutesActive')).to.eql(['2019/06/18'])
  //   });
});