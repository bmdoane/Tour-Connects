"use strict";

app.factory('RidersFactory', function(FirebaseURL, $q, $http, AuthFactory) {

  // Return all riders created for list
  const getAllRidersFB = function() {
    let riderList = [];
    return $q(function(resolve, reject) {
      $http.get(`${FirebaseURL}/riders.json`)
      .success(function(ridersObj) {
        let riderCollection = ridersObj;
        // console.log("GETriderCollection", riderCollection);
        Object.keys(riderCollection).forEach(function(key) {
          riderCollection[key].id = key;
          // console.log("riderCollection[key]", riderCollection[key]);
          // console.log("riderCollection[key].id", riderCollection[key].id);
          riderList.push(riderCollection[key]);
        });
        resolve(riderList);
      })
      .error(function(error) {
        reject(error);
      });
    });
  };

  // Return riders a venue has added to account
  const getVenueRiders = function() {
    let venueUserId = AuthFactory.getUser().uid;
    let venueUserRiders = [];
    return $q(function(resolve, reject) {
      $http.get(`${FirebaseURL}/venueRiders.json?orderBy="vuid"&equalTo="${venueUserId}"`)
      .success(function(venueRidersObj) {
        console.log("venueRidersObj", venueRidersObj);
        let venueRidersCollection = venueRidersObj;
        Object.keys(venueRidersCollection).forEach(function(key) {
          venueRidersCollection[key].id = key;
          venueUserRiders.push(venueRidersCollection[key]);
        });
        resolve(venueUserRiders);
      })
      .error(function(error) {
        reject(error);
      });
    });
  };

  // Return riders artist management has created for account 
  const getUserRiders = function() {
    let userId = AuthFactory.getUser().uid;
    // console.log("getUserRiders", userId);
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

  // Return rider linked on viewArtist
  const getRiderFB = function(riderId) {
    // console.log("getFB riderId", riderId);
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

  // For Venue to add rider to account
  const postVenueRider = function(addRider) {
    return $q(function(resolve, reject) {
      $http.post(`${FirebaseURL}/venueRiders.json`,
        JSON.stringify(addRider))
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
        // console.log("rider updated");
        resolve(riderObj);
      })
      .error(function(error) {
        reject(error);
      });
    });
  };  

  // Delete Artist Man created rider from database
  const deleteRiderFB = function(riderId) {
    console.log("delFB", riderId);
    return $q(function(resolve, reject) {
      $http.delete(`${FirebaseURL}/riders/${riderId}.json`)
      .success(function() {
        resolve();
      })
      .error(function(error) {
        reject(error);
      });
    });
  };

  // Delete Venue riders from Venue user account (myArtists)
  const deleteVenueRider = function(riderId) {
    console.log("delVenue", riderId);
    return $q(function(resolve, reject) {
      $http.delete(`${FirebaseURL}/venueRiders/${riderId}.json`)
      .success(function(venueObj) {
        resolve(venueObj);
      })
      .error(function(error) {
        reject(error);
      });
    });
  };

  // How to: If rider is deleted from riders, it would also be deleted from venue view?  Same for updates??  Think about it...

  return { getAllRidersFB, getUserRiders, getRiderFB, postRiderFB, editRiderFB, deleteRiderFB, getVenueRiders, postVenueRider, deleteVenueRider };

});