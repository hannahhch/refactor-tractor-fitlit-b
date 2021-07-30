class Activity {
  constructor(activityData) {
    this.userID = activityData.userID;
    this.date = activityData.date;
    this.numSteps = activityData.numSteps;
    this.minutesActive = activityData.minutesActive;
    this.flightsOfStairs = activityData.flightsOfStairs;
  }

  getMilesFromStepsByDate(activityData, date, userRepo) {
    let userStepsByDate = activityData.find(data => this.userID === data.userID && date === data.date);
    return parseFloat(((userStepsByDate.numSteps * userRepo.strideLength) / 5280).toFixed(1));
  }

  getActiveMinutesByDate(activityData, date) {
    let userActivityByDate = activityData.find(data => this.userID === data.userID && date === data.date);
    return userActivityByDate.minutesActive;
  }

  calculateActiveAverageForWeek(activityData, date, userRepo) {
    return parseFloat((userRepo.getWeekFromDate(date, this.userID, activityData).reduce((acc, elem) => {
      return acc += elem.minutesActive;
    }, 0) / 7).toFixed(1));
  }

  accomplishStepGoal(activityData, date, userRepo) {
    let userStepsByDate = activityData.find(data => this.userID === data.userID && date === data.date);
    if (userStepsByDate.numSteps === userRepo.dailyStepGoal) {
      return true;
    }
    return false
  }

  getDaysGoalExceeded(activityData, userRepo) {
    return activityData.filter(data => this.userID === data.userID && data.numSteps > userRepo.dailyStepGoal).map(data => data.date);
  }

  getStairRecord(activityData) {
    return activityData.filter(data => this.userID === data.userID).reduce((acc, elem) => (elem.flightsOfStairs > acc) ? elem.flightsOfStairs : acc, 0);
  }

  getAllUserAverageForDay(activityData, date, userRepo, relevantData) {
    let selectedDayData = userRepo.chooseDayDataForAllUsers(activityData, date);
    return parseFloat((selectedDayData.reduce((acc, elem) => acc += elem[relevantData], 0) / selectedDayData.length).toFixed(1));
  }

  userDataForToday(activityData, date, userRepo, relevantData) {
    let userData = userRepo.getDataFromUserID(this.userID, activityData);
    return userData.find(data => data.date === date)[relevantData];
  }

  userDataForWeek(activityData, date, userRepo, releventData) {
    return userRepo.getWeekFromDate(date, this.userID, activityData).map((data) => `${data.date}: ${data[releventData]}`);
  }

  // Friends

  getFriendsActivity(activityData, user, userRepo) {
    let data = activityData;
    let userDatalist = user.friends.map((friend) => {
      return userRepo.getDataFromUserID(friend, data)
    });
    return userDatalist.reduce((arraySoFar, listItem) => {
      return arraySoFar.concat(listItem);
    }, []);
  }

  getFriendsAverageStepsForWeek(activityData, user, date, userRepo) {
    let friendsActivity = this.getFriendsActivity(activityData, user, userRepo);
    let timeline = userRepo.chooseWeekDataForAllUsers(friendsActivity, date);
    return userRepo.combineRankedUserIDsAndAveragedData(friendsActivity, date, 'numSteps', timeline)
  }

  showChallengeListAndWinner(activityData, user, date, userRepo) {
    let rankedList = this.getFriendsAverageStepsForWeek(activityData, user, date, userRepo);

    return rankedList.map(function(listItem) {
      let userID = Object.keys(listItem)[0];
      let userName = userRepo.getDataFromID(parseInt(userID)).name;
      return `${userName}: ${listItem[userID]}`
    })
  }

  showcaseWinner(user, date, userRepo) {
    let namedList = this.showChallengeListAndWinner(user, date, userRepo);
    let winner = this.showChallengeListAndWinner(user, date, userRepo).shift();
    return winner;
  }

  getStreak(activityData, userRepo, relevantData) {
    let data = activityData;
    let sortedUserArray = (userRepo.makeSortedUserArray(this.userId, data)).reverse();
    let streaks = sortedUserArray.filter(function(element, index) {
      if (index >= 2) {
        return (sortedUserArray[index - 2][relevantData] < sortedUserArray[index - 1][relevantData] && sortedUserArray[index - 1][relevantData] < sortedUserArray[index][relevantData])
      }
    });
    return streaks.map(function(streak) {
      return streak.date;
    })
  }
  getWinnerId(activityData, user, date, userRepo) {
    let rankedList = this.getFriendsAverageStepsForWeek(activityData, user, date, userRepo);
    let keysList = rankedList.map(listItem => Object.keys(listItem));
    return parseInt(keysList[0].join(''))
  }
}



export default Activity;





/* Iteration 5 - Activity
Data
Create classes and methods that can calculate:

[ ] For a specific day (specified by a date), return the miles a user has walked based on their number of steps (use their strideLength to help calculate this)
[ ]For a user, (identified by their userID) how many minutes were they active for a given day (specified by a date)?
[ ]For a user, how many minutes active did they average for a given week (7 days)?
[ ]For a user, did they reach their step goal for a given day (specified by a date)?
[ ]For a user, find all the days where they exceeded their step goal
[ ]For a user, find their all-time stair climbing record
[ ]For all users, what is the average number of:
[ ]stairs climbed for a specified date
[ ]steps taken for a specific date
[ ]minutes active for a specific date


Dashboard
Items to add to the dashboard:

[ ]For a user, the number of steps for the latest day
[ ]For a user, the number minutes active for the latest day
[ ]For a user, the distance they have walked (in miles) for the latest day based on their step count
[ ]How their number of steps, minutes active, and flights of stairs climbed compares to all users for the latest day
[ ]For a user, a weekly view of their step count, flights of stairs climbed, and minutes active

*/