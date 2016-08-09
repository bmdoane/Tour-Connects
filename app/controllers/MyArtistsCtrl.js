"use strict";

app.controller('MyArtistsCtrl', function($scope, UserFactory, RidersFactory, $timeout) {

	// Timeout is to load user before it attempts to load their riders
	// Load user riders for Artist Managers
	$timeout(function() {
		RidersFactory.getUserRiders()
		.then(function(userRidersCollection) {
			$scope.userRiders = userRidersCollection;
			// console.log("$scope.userRiders", $scope.userRiders);
		});
	}, 50);

	// Load user riders for Venues
	$timeout(function() {
		RidersFactory.getVenueRiders()
		.then(function(userVenueCollection) {
			console.log("userVenueCollection", userVenueCollection);
			$scope.venueRiders = userVenueCollection;
		});
	}, 50);

	// Load user details 
	$timeout(function() {
		UserFactory.getUserDetails()
		.then(function(userDetails) {
			// console.log("userDetails", userDetails);
			$scope.currentUser = userDetails[0];
			// console.log("currentUser", $scope.currentUser);
		});
	}, 50);
		
});

	/************** IF I DO NOT GET FLATTENED DATA TO WORK *****************/
	// Do I want this or do I want a getVenueUser??
	// Can I use this to apply logic to or would it be better to parse in factory??
	// $timeout(function() {
	// 	RidersFactory.getAllRidersFB()
	// 	.then(function(ridersCollection) {
	// 		$scope.allRiders = ridersCollection;
	// 		// console.log("allRiders", $scope.allRiders);

	// 	});
	// });