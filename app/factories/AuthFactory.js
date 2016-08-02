'use strict';

app.factory('AuthFactory', function(FirebaseURL, $q, $http) {

  let currentUserId = null;
  let googleProvider = new firebase.auth.GoogleAuthProvider();

  //Auth function that takes in a generic provided (so it works with email or google eventually)
  let authWithProvider = function(provider) {
    return firebase.auth().signInWithPopup(provider);
  };

  //isAuth function to see if currentUserId === true
  let isAuthenticated = function() {
    return (currentUserId) ? true : false;
  };

  //getUser function returns current userId
  let getUser = function() {
    return currentUserId;
  };

  let setUser = function(id) {
    currentUserId = id;
    // console.log(currentUserId, "currentUserId")
  };

  let createWithEmail = function (email, password) {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    console.warn(errorCode, errorMessage);
    });
  };
  
  let authWithEmail = function (email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // What is this?
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    console.warn(errorCode, errorMessage);
    });
  };

  const postUserFB = function(newUser) {
    return $q(function(resolve, reject) {
      $http.post(`${FirebaseURL}/users.json`,
        JSON.stringify(newUser))
      .success(function() {
        resolve();
      })
      .error(function(error) {
        reject(error);
      });
    });
  };

  return {
    authWithProvider, isAuthenticated, getUser, setUser, googleProvider, createWithEmail, authWithEmail, postUserFB
  };

});

app.run(["$location", "FBCreds", "AuthFactory", function ($location, FBCreds, AuthFactory) {
  let authConfig = {
    apiKey: FBCreds.apiKey,
    authDomain: FBCreds.authDomain
  };

  firebase.initializeApp(authConfig);

  // Get currently signed in user with observer on Auth Object
  // This is for a page refresh redirection
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      AuthFactory.setUser(user.uid);
      $location.url("/myArtists");
    } else {
      $location.url("/login");
      AuthFactory.setUser(null); //this is to reset the current user
    }
  });
}]);