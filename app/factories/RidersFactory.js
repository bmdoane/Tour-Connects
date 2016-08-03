"use strict";

app.factory('RidersFactory', function(FirebaseURL, $q, $http) {

  const postRiderFB = function(newRider) {
    return $q(function(resolve, reject) {
      $http.post(`${FirebaseURL}/riders.json`,
        JSON.stringify(newRider))
      .success(function() {
        resolve();
      })
      .error(function(error) {
        reject(error);
      });
    });
  };

  return { postRiderFB }

});