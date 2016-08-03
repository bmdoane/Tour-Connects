"use strict";

app.factory('UserFactory', function(FirebaseURL, $q, $http) {

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

  return { postUserFB };
  
});