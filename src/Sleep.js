import sleepData from './data/sleep';

class Sleep {
  constructor(sleepData) {
    this.id = sleepData.userID;
    this.hoursSlept = sleepData.hoursSlept;
    this.sleepQuality = sleepData.sleepQuality;
    this.date = sleepData.date;
  }

  calculateAverageSleep(sleepData) {
    let perDaySleep = sleepData.filter((data) => this.id === data.userID);
    return Math.floor(perDaySleep.reduce((sumSoFar, data) => {
      return sumSoFar += data.hoursSlept;
    }, 0) / perDaySleep.length);
  }

  calculateAverageSleepQuality(sleepData) {
    let perDaySleepQuality = sleepData.filter((data) => this.id === data.userID);
    return Math.floor(perDaySleepQuality.reduce((sumSoFar, data) => {
      return sumSoFar += data.sleepQuality;
    }, 0) / perDaySleepQuality.length);
  }

  calculateDailySleep(sleepData, date) {
    let findSleepByDate = sleepData.find((data) => this.id === data.userID && date === data.date);
    return findSleepByDate.hoursSlept;
  }

  calculateDailySleepQuality(sleepData, date) {
    let findSleepQualityByDate = sleepData.find((data) => this.id === data.userID && date === data.date);
    return findSleepQualityByDate.sleepQuality;
  }

  calculateWeekSleep(date, sleepData, userRepo) {
    return userRepo.getWeekFromDate(date, this.id, sleepData).map((data) => `${data.date}: ${data.hoursSlept}`);
  }

  calculateWeekSleepQuality(date, sleepData, userRepo) {
    return userRepo.getWeekFromDate(date, this.id, sleepData).map((data) => `${data.date}: ${data.sleepQuality}`);
  }

  determineBestSleepers(date, sleepData, userRepo) {
    let timeline = userRepo.chooseWeekDataForAllUsers(sleepData, date);
    let userSleepObject = userRepo.isolateUsernameAndRelevantData(sleepData, date, 'sleepQuality', timeline);

    return Object.keys(userSleepObject).filter((key) => {
      return (userSleepObject[key].reduce((sumSoFar, sleepQualityValue) => {
        sumSoFar += sleepQualityValue
        return sumSoFar;
      }, 0) / userSleepObject[key].length) > 3
    }).map((sleeper) => {
      return userRepo.getDataFromID(parseInt(sleeper)).name;
    })
  }

  determineSleepWinnerForWeek(date, sleepData, userRepo) {
    // console.log(date, 'sleepData->', sleepData)
    let timeline = userRepo.chooseWeekDataForAllUsers(sleepData, date);

    let sleepRankWithData = userRepo.combineRankedUserIDsAndAveragedData(sleepData, date, 'sleepQuality', timeline);
    // console.log('here', sleepRankWithData);
    // console.log('mathos', this.getWinnerNamesFromList(sleepRankWithData, userRepo))
    return this.getWinnerNamesFromList(sleepRankWithData, userRepo);
  }

  getWinnerNamesFromList(sortedArray, userRepo) {
    let bestSleepers = sortedArray.filter((element) => {
      return element[Object.keys(element)] === Object.values(sortedArray[0])[0]
    });
    let bestSleeperIds = bestSleepers.map((bestSleeper) => {
      return (Object.keys(bestSleeper));
    });
    let number = bestSleeperIds.flat();
    return number.map((sleepNumber) => {
      // console.log('sleep number', typeof sleepNumber);
      let number = parseInt(sleepNumber)
      // console.log('parsent number--->', typeof number);
      // console.log('get data from user id', userRepo.getDataFromID(parseInt(sleepNumber)).name)
      return userRepo.getDataFromID(parseInt(number)).name
    });
    // console.log('result', result)
    // return result;
  }

  determineSleepHoursWinnerForDay(date, sleepData, userRepo) {
    let timeline = userRepo.chooseDayDataForAllUsers(sleepData, date);
    let sleepRankWithData = userRepo.combineRankedUserIDsAndAveragedData(sleepData, date, 'hoursSlept', timeline);

    return this.getWinnerNamesFromList(sleepRankWithData, userRepo);
  }

  calculateAllUserSleepQuality() {
    var totalSleepQuality = sleepData.reduce((sumSoFar, dataItem) => {
      sumSoFar += dataItem.sleepQuality;
      return sumSoFar;
    }, 0)
    return totalSleepQuality / sleepData.length
  }
}

export default Sleep;


/*

Iteration 4 - Sleep
Data
Create classes and methods that can calculate:

[X] For a user (identified by their userID), the average number of hours slept per day
[X] For a user, their average sleep quality per day over all time
[X] For a user, how many hours they slept for a specific day (identified by a date)
[X] For a user, their sleep quality for a specific day (identified by a date)
[X] For a user, how many hours slept each day over the course of a given week (7 days) - you should be able to calculate this for any week, not just the latest week
[X] For a user, their sleep quality each day over the course of a given week (7 days) - you should be able to calculate this for any week, not just the latest week
[X] For all users, the average sleep quality


Dashboard
Items to add to the dashboard:

[X] For a user, their sleep data for the latest day (hours slept and quality of sleep)
[X] For a user, their sleep data over the course of the latest week (hours slept and quality of sleep)
[X] For a user, their all-time average sleep quality and all-time average number of hours slept
 */