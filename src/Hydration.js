class Hydration {
  constructor(hydrationData) {
    this.userID = hydrationData.userID;
    this.date = hydrationData.date;
    this.numOunces = hydrationData.numOunces;
  }

  calculateAverageOunces(hydrationData) {
    let perDayUserHydration = hydrationData.filter((data) => this.userID === data.userID);
    let avgWater = perDayUserHydration.reduce((sumSoFar, data) => {
      return sumSoFar += data.numOunces;
    }, 0) / perDayUserHydration.length;
    return Math.round(avgWater)
  }

  calculateDailyOunces(hydrationData, date) {
    let findOuncesByDate = hydrationData.find((data) => this.userID === data.userID && date === data.date);
    return findOuncesByDate.numOunces;
  }

  calculateFirstWeekOunces(userRepo, hydrationData) {
    return userRepo.getFirstWeek(this.userID, hydrationData).map((data) => `${data.date}: ${data.numOunces}`);
  }

  calculateRandomWeekOunces(date, userRepo, hydrationData) {
    return userRepo.getWeekFromDate(date, this.userID, hydrationData).map((data) => `${data.date}: ${data.numOunces}`);
  }
}


export default Hydration;




/*

Iteration 3 - Hydration
Data
Create classes and methods that can calculate:

[X] For a user (identified by their userID - this is the same for all methods requiring a specific user’s data), the average fluid ounces consumed per day for all time
[X] For a user, how many fluid ounces they consumed for a specific day (identified by a date)
[X] For a user, how many fluid ounces of water consumed each day over the course of a week (7 days) - return the amount for each day
[X] You have to decide which classes should contain each method. Think about whose responsibility it is to own the method.

Dashboard
For your user (or any user you choose), add:

[X] A display to show how much water they have consumed today (these displays are often called “widgets” in the FE tech world)
[X] A display to show much water they have consumed each day over the course of the latest week

*/