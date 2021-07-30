import './css/base.scss';
import './css/styles.scss';

import './images/person walking on path.jpg';
import './images/The Rock.jpg';

// import userData from './data/users';
// import hydrationData from './data/hydration';
// import sleepData from './data/sleep';
// import activityData from './data/activity';

import {
  getUserData
} from './apiCalls.js';

import User from './User';
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';
import UserRepo from './User-repo';

var sidebarName = document.getElementById('sidebarName');
var stepGoalCard = document.getElementById('stepGoalCard');
var headerText = document.getElementById('headerText');
var userAddress = document.getElementById('userAddress');
var userEmail = document.getElementById('userEmail');
var userStridelength = document.getElementById('userStridelength');
var friendList = document.getElementById('friendList');
var hydrationToday = document.getElementById('hydrationToday');
var hydrationAverage = document.getElementById('hydrationAverage');
var hydrationThisWeek = document.getElementById('hydrationThisWeek');
var hydrationEarlierWeek = document.getElementById('hydrationEarlierWeek');
var historicalWeek = document.querySelectorAll('.historicalWeek');
var sleepToday = document.getElementById('sleepToday');
var sleepQualityToday = document.getElementById('sleepQualityToday');
var avUserSleepQuality = document.getElementById('avUserSleepQuality');
var sleepThisWeek = document.getElementById('sleepThisWeek');
var sleepEarlierWeek = document.getElementById('sleepEarlierWeek');
var friendChallengeListToday = document.getElementById('friendChallengeListToday');
var friendChallengeListHistory = document.getElementById('friendChallengeListHistory');
var bigWinner = document.getElementById('bigWinner');
var userStepsToday = document.getElementById('userStepsToday');
var avgStepsToday = document.getElementById('avgStepsToday');
var userStairsToday = document.getElementById('userStairsToday');
var avgStairsToday = document.getElementById('avgStairsToday');
var userMinutesToday = document.getElementById('userMinutesToday');
var avgMinutesToday = document.getElementById('avgMinutesToday');
var userStepsThisWeek = document.getElementById('userStepsThisWeek');
var userStairsThisWeek = document.getElementById('userStairsThisWeek');
var userMinutesThisWeek = document.getElementById('userMinutesThisWeek');
var bestUserSteps = document.getElementById('bestUserSteps');
var streakList = document.getElementById('streakList');
var streakListMinutes = document.getElementById('streakListMinutes')

// this element was missing, from method addInfoToSidebar -> avgStepGoalCard.innetText
var avgStepGoalCard = document.getElementById('avStepGoalCard')

let user
// let userRepo
// let hydrationRepo
// let sleepRepo
// let activityRepo
// Event listenser 👇
window.addEventListener('load', fetchData);

function fetchData() {
  Promise.all([getUserData('users'), getUserData('sleep'), getUserData('activity'), getUserData('hydration')])
    .then(values => {
      startApp(values)
    })
}
//values[0].userData
//values[1].sleepData
//values[2].activityData
//values[3].hydrationData

function startApp(fetchedData) {
  let users = fetchedData[0].userData.map(user => new User(user));
  let userRepo = new UserRepo(users)
  // console.log('USERS ->>>', userRepo)
  let hydrationRepo = fetchedData[3].hydrationData.map(hydration => new Hydration(hydration));
  // console.log('HYDRATION ----->', hydrationRepo);
  let sleepRepo = fetchedData[1].sleepData.map(sleep => new Sleep(sleep));
  // console.log('SLEEP ---->', sleepRepo)
  let activityRepo = fetchedData[2].activityData.map(activity => new Activity(activity));
  // console.log('ACTIVITY --->', activityRepo);
  let userNowId = pickUser();
  let userNow = getUserById(userNowId, userRepo);
  let today = makeToday(userRepo, userNowId, fetchedData[3].hydrationData);
  let randomHistory = makeRandomDate(userRepo, userNowId, fetchedData[3].hydrationData);
  // // historicalWeek.forEach(instance => instance.insertAdjacentHTML('afterBegin', `Week of ${randomHistory}`));
  addInfoToSidebar(userRepo, userRepo.users[pickUser(userRepo.users)]);
  addSleepInfo(fetchedData[1].sleepData, today, sleepRepo[pickUser(sleepRepo)], userRepo, randomHistory);
  // let winnerNow = makeWinnerID(activityRepo, userNow, today, userRepo);
  // // addActivityInfo(userNowId, activityRepo, today, userRepo, randomHistory, userNow, winnerNow);
  addHydrationInfo(hydrationRepo[pickUser(hydrationRepo)], today, userRepo, randomHistory, fetchedData[3].hydrationData)
  // /// THIS METHOD PULLS DATA FOR WEEKLY -> addFriendGameInfo
  //   addFriendGameInfo(userNowId, activityRepo, userRepo, today, randomHistory, userNow);
}


//this function creates new instances of the user class!
// its working [x]
// function makeUsers(usersData) {
//   return usersData.map(userData => user = new User(userData))
// }

function pickUser() {
  return Math.floor(Math.random() * 50);
}

// this method looks like gives whole user object back by checking it by given ID
// its working [x]
function getUserById(id, listRepo) {
  let result = listRepo.getDataFromID(id);
  return result
}

// this method runs all info to be displayed on nav bar!
// its working [x]

function addInfoToSidebar(userRepo, user) {
  // console.log('ADD INFO', user)
  // console.log('user repo', userRepo);
  sidebarName.innerText = user.name;
  headerText.innerText = `${user.getFirstName()}'s Activity Tracker`;
  stepGoalCard.innerText = `Your daily step goal is ${user.dailyStepGoal}.`
  avgStepGoalCard.innerText = `The average daily step goal is ${userRepo.calculateAverageStepGoal()}`;
  userAddress.innerText = user.address;
  userEmail.innerText = user.email;
  userStridelength.innerText = `Your stridelength is ${user.strideLength} meters.`;
  friendList.insertAdjacentHTML('afterBegin', makeFriendHTML(userRepo, user))
}

function makeFriendHTML(userRepo, user) {
  return user.getFriendsNames(userRepo.users).map(friendName => `<li class='historical-list-listItem'>${friendName}</li>`).join('');
}

function makeWinnerID(activityInfo, user, dateString, userStorage) {
  // console.log('activity', activityInfo, 'user', user, 'date', dateString, 'userrepo', userStorage)
  return activityInfo.getWinnerId(user, dateString, userStorage)
}

function makeToday(userStorage, id, dataSet) {
  // console.log(userStorage, id, dataSet, 'makeToday fn')
  // console.log(userStorage.makeSortedUserArray(id, dataSet), "hello")
  var sortedArray = userStorage.makeSortedUserArray(id, dataSet);
  return sortedArray[0].date;
  // console.log('Here baby', sortedArray[0].date)
}

function makeRandomDate(userStorage, id, dataSet) {
  var sortedArray = userStorage.makeSortedUserArray(id, dataSet);
  return sortedArray[Math.floor(Math.random() * sortedArray.length + 1)].date

}


/// THIS METHOD IS DISPLAYING INTO DOM ALL HYDRATION DATA, DAILY WEEKLY AND ALL TIME CONSUMPTION
// [X] IT IS WORKING
function addHydrationInfo(hydrationInfo, dateString, userStorage, laterDateString, hydrationData) {
  hydrationToday.insertAdjacentHTML('afterBegin', `<p>You drank</p><p><span class="number">${hydrationInfo.calculateDailyOunces(hydrationData,dateString)}</span></p><p>oz water today.</p>`);
  hydrationAverage.insertAdjacentHTML('afterBegin', `<p>Your average water intake is</p><p><span class="number">${hydrationInfo.calculateAverageOunces(hydrationData)}</span></p> <p>oz per day.</p>`)
  hydrationThisWeek.insertAdjacentHTML('afterBegin', makeHydrationHTML(hydrationInfo, userStorage, hydrationInfo.calculateFirstWeekOunces(userStorage, hydrationData)));
  hydrationEarlierWeek.insertAdjacentHTML('afterBegin', makeHydrationHTML(hydrationInfo, userStorage, hydrationInfo.calculateRandomWeekOunces(laterDateString, userStorage, hydrationData)));
}

function makeHydrationHTML(hydrationInfo, userStorage, method) {
  return method.map(drinkData => `<li class="historical-list-listItem">On ${drinkData}oz</li>`).join('');
}

// this method is displaying users weekly , daily slept hours
// [x] its working
function addSleepInfo(sleepData, dateString, sleepRepo, userStorage, laterDateString) {
  sleepToday.insertAdjacentHTML("afterBegin", `<p>You slept</p> <p><span class="number">${sleepRepo.calculateDailySleep(sleepData, dateString)}</span></p> <p>hours today.</p>`);
  sleepQualityToday.insertAdjacentHTML("afterBegin", `<p>Your sleep quality was</p> <p><span class="number">${sleepRepo.calculateDailySleepQuality(sleepData, dateString)}</span></p><p>out of 5.</p>`);
  avUserSleepQuality.insertAdjacentHTML("afterBegin", `<p>The average user's sleep quality is</p> <p><span class="number">${Math.round(sleepRepo.calculateAllUserSleepQuality() * 100) / 100}</span></p><p>out of 5.</p>`);
  sleepThisWeek.insertAdjacentHTML('afterBegin', makeSleepHTML(sleepData, userStorage, sleepRepo.calculateWeekSleep(dateString, sleepData, userStorage)));
  sleepEarlierWeek.insertAdjacentHTML('afterBegin', makeSleepHTML(sleepData, userStorage, sleepRepo.calculateWeekSleep(laterDateString, sleepData, userStorage)));
}

function makeSleepHTML(sleepData, userStorage, method) {
  return method.map(sleepData => `<li class="historical-list-listItem">On ${sleepData} hours</li>`).join('');
}


// it looks like this method is never been used anywhere so far, dont see anyrhing on dom updates ???
function makeSleepQualityHTML(id, sleepInfo, userStorage, method) {
  return method.map(sleepQualityData => `<li class="historical-list-listItem">On ${sleepQualityData}/5 quality of sleep</li>`).join('');
}

function addActivityInfo(id, activityInfo, dateString, userStorage, laterDateString, user, winnerId) {
  userStairsToday.insertAdjacentHTML("afterBegin", `<p>Stair Count:</p><p>You</><p><span class="number">${activityInfo.userDataForToday(id, dateString, userStorage, 'flightsOfStairs')}</span></p>`)
  avgStairsToday.insertAdjacentHTML("afterBegin", `<p>Stair Count: </p><p>All Users</p><p><span class="number">${activityInfo.getAllUserAverageForDay(dateString, userStorage, 'flightsOfStairs')}</span></p>`)
  userStepsToday.insertAdjacentHTML("afterBegin", `<p>Step Count:</p><p>You</p><p><span class="number">${activityInfo.userDataForToday(id, dateString, userStorage, 'numSteps')}</span></p>`)
  avgStepsToday.insertAdjacentHTML("afterBegin", `<p>Step Count:</p><p>All Users</p><p><span class="number">${activityInfo.getAllUserAverageForDay(dateString, userStorage, 'numSteps')}</span></p>`)
  userMinutesToday.insertAdjacentHTML("afterBegin", `<p>Active Minutes:</p><p>You</p><p><span class="number">${activityInfo.userDataForToday(id, dateString, userStorage, 'minutesActive')}</span></p>`)
  avgMinutesToday.insertAdjacentHTML("afterBegin", `<p>Active Minutes:</p><p>All Users</p><p><span class="number">${activityInfo.getAllUserAverageForDay(dateString, userStorage, 'minutesActive')}</span></p>`)
  userStepsThisWeek.insertAdjacentHTML("afterBegin", makeStepsHTML(id, activityInfo, userStorage, activityInfo.userDataForWeek(id, dateString, userStorage, "numSteps")));
  userStairsThisWeek.insertAdjacentHTML("afterBegin", makeStairsHTML(id, activityInfo, userStorage, activityInfo.userDataForWeek(id, dateString, userStorage, "flightsOfStairs")));
  userMinutesThisWeek.insertAdjacentHTML("afterBegin", makeMinutesHTML(id, activityInfo, userStorage, activityInfo.userDataForWeek(id, dateString, userStorage, "minutesActive")));
  bestUserSteps.insertAdjacentHTML("afterBegin", makeStepsHTML(user, activityInfo, userStorage, activityInfo.userDataForWeek(winnerId, dateString, userStorage, "numSteps")));
}

function makeStepsHTML(id, activityInfo, userStorage, method) {
  return method.map(activityData => `<li class="historical-list-listItem">On ${activityData} steps</li>`).join('');
}

function makeStairsHTML(id, activityInfo, userStorage, method) {
  return method.map(data => `<li class="historical-list-listItem">On ${data} flights</li>`).join('');
}

function makeMinutesHTML(id, activityInfo, userStorage, method) {
  return method.map(data => `<li class="historical-list-listItem">On ${data} minutes</li>`).join('');
}

function addFriendGameInfo(id, activityInfo, userStorage, dateString, laterDateString, user) {
  friendChallengeListToday.insertAdjacentHTML("afterBegin", makeFriendChallengeHTML(id, activityInfo, userStorage, activityInfo.showChallengeListAndWinner(user, dateString, userStorage)));
  streakList.insertAdjacentHTML("afterBegin", makeStepStreakHTML(id, activityInfo, userStorage, activityInfo.getStreak(userStorage, id, 'numSteps')));
  streakListMinutes.insertAdjacentHTML("afterBegin", makeStepStreakHTML(id, activityInfo, userStorage, activityInfo.getStreak(userStorage, id, 'minutesActive')));
  friendChallengeListHistory.insertAdjacentHTML("afterBegin", makeFriendChallengeHTML(id, activityInfo, userStorage, activityInfo.showChallengeListAndWinner(user, dateString, userStorage)));
  bigWinner.insertAdjacentHTML('afterBegin', `THIS WEEK'S WINNER! ${activityInfo.showcaseWinner(user, dateString, userStorage)} steps`)
}

function makeFriendChallengeHTML(id, activityInfo, userStorage, method) {
  return method.map(friendChallengeData => `<li class="historical-list-listItem">Your friend ${friendChallengeData} average steps.</li>`).join('');
}

function makeStepStreakHTML(id, activityInfo, userStorage, method) {
  return method.map(streakData => `<li class="historical-list-listItem">${streakData}!</li>`).join('');
}





// we need to make sure that startApp() method is on window.addEventListener function,
//it looks like its randomizing user on page load and also, assigning new instances of the class with hardcoded data,
// whre we will be passing fetched data. Line: 51-69