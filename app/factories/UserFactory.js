"use strict";

app.factory('UserFactory', function(FirebaseURL, $q, $http, AuthFactory) {

  // const getUserDetails = function() {
  //   let userId = AuthFactory.getUser().uid;
  //   console.log("userId", userId);
  //   return $q(function(resolve, reject) {
  //     $http.get(`${FirebaseURL}/users.json?orderBy="uid"&equalTo="${userId}"`)
  //     .success(function(userObj) {
  //       let userDetails = userObj;
  //       console.log("userObj", userObj);
  //       resolve(userDetails);
  //     })
  //     .error(function(error) {
  //       reject(error);
  //     });
  //   });
  // };

  const getUserDetails = function() {
    let userId = AuthFactory.getUser().uid;
    let details = [];
    return $q(function(resolve, reject) {
      $http.get(`${FirebaseURL}/users.json?orderBy="uid"&equalTo="${userId}"`)
      .success(function(userObj) {
        console.log("userObj", userObj);
        let userCollection = userObj;
        Object.keys(userCollection).forEach(function(key) {
          userCollection[key].id = key;
          details.push(userCollection[key]);
        }); 
        console.log("details", details); 
        resolve(details);
      })
      .error(function(error) {
        reject(error);
      });
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

  return { getUserDetails, postUserFB };
  
});