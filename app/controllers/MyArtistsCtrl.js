"use strict";

app.controller('MyArtistsCtrl', function($scope, UserFactory, RidersFactory, $timeout, $location) {

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
			// console.log("userVenueCollection", userVenueCollection);
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

	$scope.deleteVenue = function(riderId) {
		console.log("DV is happening");
		console.log("riderId", riderId);
		// Delete rider, link, button and page refresh??
		RidersFactory.deleteVenueRider(riderId)
		.then(function(userVenueRiders) {
			console.log("userVenueRiders", userVenueRiders);
			$scope.venueRiders = userVenueRiders;
			$location.url('/myArtists');
		});
	};
		
});