class UserRepo {
  constructor(users) {
    this.users = users;
    // console.log('all users', this.users);
  }
  getDataFromID(id) {

    // return this.users.find((user) => id === user.id);
    return this.users.find((user) => id === user.id);
  }

  // helper function being used in makeSortedUserArray 👇
  getDataFromUserID(id, dataSet) {
    return dataSet.filter((userData) => id === userData.userID);
  }
  // Nina working on 👇
  calculateAverageStepGoal() {
    // var totalStepGoal = this.users.reduce((sumSoFar, data) => {
    //   return sumSoFar = sumSoFar + data.dailyStepGoal;
    // }, 0);
    // return totalStepGoal / this.users.length;

    const totalStepGoal = this.users.reduce((total, user) => {
      total += user.dailyStepGoal;
      return total
    }, 0);
    // console.log(totalStepGoal / this.users.length, "nina")
    return totalStepGoal / this.users.length;
  }

  // Natalie working on
  makeSortedUserArray(id, dataSet) {
    let selectedID = this.getDataFromUserID(id, dataSet)
    let sortedByDate = selectedID.sort((a, b) => new Date(b.date) - new Date(a.date));
    return sortedByDate;
  }
  // Natalie working on
  getToday(id, dataSet) {
    // return this.makeSortedUserArray(id, dataSet)[0].date;
    let result = this.makeSortedUserArray(id, dataSet)[0].date;
    // console.log("Natalie getToday", result)
    return result
  }
  //Natalie
  getFirstWeek(id, dataSet) {
    return this.makeSortedUserArray(id, dataSet).slice(0, 7);
  }
  //Natalie
  getWeekFromDate(date, id, dataSet) {
    let dateIndex = this.makeSortedUserArray(id, dataSet).indexOf(this.makeSortedUserArray(id, dataSet).find((sortedItem) => (sortedItem.date === date)));
    return this.makeSortedUserArray(id, dataSet).slice(dateIndex, dateIndex + 7);
  }
  chooseWeekDataForAllUsers(dataSet, date) {
    return dataSet.filter(function(dataItem) {
      return (new Date(date)).setDate((new Date(date)).getDate() - 7) <= new Date(dataItem.date) && new Date(dataItem.date) <= new Date(date)
    })
  }

  /// fara is working on this ->
  chooseDayDataForAllUsers(dataSet, date) {
    let result = dataSet.filter(dataItem => {
      return dataItem.date === date
    });
    return result
  }

  isolateUsernameAndRelevantData(dataSet, date, relevantData, listFromMethod) {
    return listFromMethod.reduce(function(objectSoFar, dataItem) {
      if (!objectSoFar[dataItem.userID]) {
        objectSoFar[dataItem.userID] = [dataItem[relevantData]]
      } else {
        objectSoFar[dataItem.userID].push(dataItem[relevantData])
      }
      return objectSoFar;
    }, {});
  }
  rankUserIDsbyRelevantDataValue(dataSet, date, relevantData, listFromMethod) {
    let sortedObjectKeys = this.isolateUsernameAndRelevantData(dataSet, date, relevantData, listFromMethod)
    return Object.keys(sortedObjectKeys).sort(function(b, a) {
      return (sortedObjectKeys[a].reduce(function(sumSoFar, sleepQualityValue) {
        sumSoFar += sleepQualityValue
        return sumSoFar;
      }, 0) / sortedObjectKeys[a].length) - (sortedObjectKeys[b].reduce(function(sumSoFar, sleepQualityValue) {
        sumSoFar += sleepQualityValue
        return sumSoFar;
      }, 0) / sortedObjectKeys[b].length)
    });
  }
  combineRankedUserIDsAndAveragedData(dataSet, date, relevantData, listFromMethod) {
    let sortedObjectKeys = this.isolateUsernameAndRelevantData(dataSet, date, relevantData, listFromMethod)
    let rankedUsersAndAverages = this.rankUserIDsbyRelevantDataValue(dataSet, date, relevantData, listFromMethod)
    return rankedUsersAndAverages.map(function(rankedUser) {
      rankedUser = {
        [rankedUser]: sortedObjectKeys[rankedUser].reduce(
          function(sumSoFar, sleepQualityValue) {
            sumSoFar += sleepQualityValue
            return sumSoFar;
          }, 0) / sortedObjectKeys[rankedUser].length
      };
      return rankedUser;
    });
  }
}

export default UserRepo;


/*

UserRepository class

new UserRepository(data);
[ ] A UserRepository holds onto all of the User objects
[ ] It should have a parameter to take in user data
[ ] It should have methods to determine:
[ ] Given a user’s ID, what is their user data?
[ ] The average step goal amongst all users
*/