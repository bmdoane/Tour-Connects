"use strict";

app.factory('RidersFactory', function(FirebaseURL, $q, $http) {

  const getAllRidersFB = function() {
    let riderList = [];
    return $q(function(resolve, reject) {
      $http.get(`${FirebaseURL}/riders.json`)
      .success(function(ridersObj) {
        let riderCollection = ridersObj;
        Object.keys(riderCollection).forEach(function(key) {
          riderCollection[key].id = key;
          console.log("riderCollection[key]", riderCollection[key]);
          console.log("riderCollection[key].id", riderCollection[key].id);
          riderList.push(riderCollection[key]);
        });
        resolve(riderList);
      })
      .error(function(error) {
        reject(error);
      });
    });
  };

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

  return { getAllRidersFB, postRiderFB };

});