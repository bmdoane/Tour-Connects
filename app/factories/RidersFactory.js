"use strict";

app.factory('RidersFactory', function(FirebaseURL, $q, $http, AuthFactory) {

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

  const getUserRiders = function() {
    let userId = AuthFactory.getUser().uid;
    console.log("getUserRiders", userId);
    let userRiders = [];
    return $q(function(resolve, reject) {
      $http.get(`${FirebaseURL}/riders.json?orderBy="uid"&equalTo="${userId}"`)
      .success(function(userRidersObj) {
        let userRidersCollection = userRidersObj;
        Object.keys(userRidersCollection).forEach(function(key) {
          userRidersCollection[key].id = key;
          userRiders.push(userRidersCollection[key]);
        });
        resolve(userRiders);
      })
      .error(function(error) {
        reject(error);
      });
    });
  };

  // To use for rider links to viewArtist
  const getRiderFB = function(riderId) {
    console.log("getFB riderId", riderId);
    return $q(function(resolve, reject) {
      $http.get(`${FirebaseURL}/riders/${riderId}.json`)
      .success(function(riderObj) {
        resolve(riderObj);
      })
      .error(function(error) {
        reject(error);
      });
    });
  };

  // For Art Man to create riders
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

  // $http.put requires arguments of the object as well as the keyId 
  const editRiderFB = function(updatedRider, riderId) {
    return $q(function(resolve, reject) {
      $http.put(`${FirebaseURL}/riders/${riderId}.json`,
        updatedRider)
      .success(function(riderObj) {
        console.log("rider updated");
        resolve(riderObj);
      })
      .error(function(error) {
        reject(error);
      });
    });
  };  

  const deleteRiderFB = function(riderId) {
    console.log("delFB", riderId);
    return $q(function(resolve, reject) {
      $http.delete(`${FirebaseURL}/riders/${riderId}.json`)
      .success(function() {
        console.log("rider deleted");
        resolve();
      })
      .error(function(error) {
        reject(error);
      });
    });
  };

  return { getAllRidersFB, getUserRiders, getRiderFB, postRiderFB, editRiderFB, deleteRiderFB };

});