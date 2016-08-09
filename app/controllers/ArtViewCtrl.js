"use strict";

app.controller('ArtViewCtrl', function($scope, RidersFactory, $routeParams, UserFactory, $location) {

	// Routeparams prop can be any namespace, just needs to match app.config
	// Is this bad to have hanging out??
	RidersFactory.getRiderFB($routeParams.riderId)
	.then(function(riderObj) {
		// console.log("ArtViewRiderObj", riderObj);
		$scope.currentRider = riderObj;
	});

	// To use for venue.  If currentUser is !isAdmin
	UserFactory.getUserDetails()
	.then(function(userDetails) {
		// console.log("ArtViewUserDetails", userDetails);
		$scope.currentUser = userDetails[0];
		console.log("viewArtCurrentUser", $scope.currentUser);
	});

	// Add venueUserId to rider and post to FB (for myArtist venue view)
	$scope.addVenToRider = function(venueUserId) {
		// console.log("venueUserId", venueUserId);
		$scope.currentRider.vuid = venueUserId;
		RidersFactory.postVenueRider($scope.currentRider)
		.then(function() {
			$location.url('/myArtists');
		});
	};

});