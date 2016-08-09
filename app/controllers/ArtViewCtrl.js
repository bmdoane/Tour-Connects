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
		console.log("ArtViewUserDetails", userDetails);
		$scope.currentUser = userDetails[0];
		console.log("viewArtCurrentUser", $scope.currentUser);
	});

	// Add venueUserId to rider and post to FB (for myArtist venue view)
	$scope.addVenToRider = function(venueUserId) {
		console.log("venueUserId", venueUserId);
		$scope.currentRider.vuid = venueUserId;
		RidersFactory.postVenueRider($scope.currentRider)
		.then(function() {
			$location.url('/myArtists');
		});
	};

});

	/************** IF I DO NOT GET FLATTENED DATA TO WORK *****************/
	// If !isAdmin and presses button add venueUserId to venue property on rider object.
	// $scope.addVenToRider = function(venueUserId) {
	// 	console.log("venueUserId", venueUserId);
	// 	// console.log("$scope.currentRider", artistRider);
	// 	$scope.currentRider.venues.push(venueUserId);
	// 	// Update rider with added user on venues property
	// 	console.log("$scope.currentRider", $scope.currentRider);
	// 	RidersFactory.editRiderFB($scope.currentRider, $routeParams.riderId)
	// 	.then(function(result) {
	// 		console.log("update result", result);
	// 		$location.url('/myArtists');
	// 	});
	// };