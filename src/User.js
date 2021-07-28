class User {
  constructor(userDetails) {
    this.id = userDetails.id;
    this.name = userDetails.name;
    this.address = userDetails.address;
    this.email = userDetails.email;
    this.strideLength = userDetails.strideLength;
    this.dailyStepGoal = userDetails.dailyStepGoal;
    this.friends = userDetails.friends;

  }
  getFirstName() {
    return this.name.split(' ', 1).join();
  }
  getFriendsNames(userStorage) {
    return this.friends.map((friendId) => (userStorage.getDataFromID(friendId).name));
  }
}

export default User;
/*

User class
[ ] new User(userData);
[ ] A User represents a single user
[ ] It should have a parameter to take in a userData object
[ ] Each user holds on to the user properties from the data file
[ ] Should have a method to:
[ ] Return a user’s first name only

Dashboard
Use the scripts.js file to add information to the DOM. This JS file should call methods from your classes to retrieve information. There should not be any DOM manipulation within the User or UserRepository class files.

To develop this dashboard, first choose a user at random - someone with a randomly generated name that speaks to you. On the dashboard for a user:

[ ] Create an info card on the dashboard with all of user’s info on the page
[ ] Display their first name somewhere prominently on the page to welcome them
[ ] For a specific user, display how their step goal compares to the average step goal amongst all users (this display should not be hard-coded)

*/