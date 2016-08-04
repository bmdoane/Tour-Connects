"use strict";

app.controller('ArtEditCtrl', function($scope, RidersFactory, $routeParams) {

	RidersFactory.getRiderFB($routeParams.riderId)
	.then(function(riderObj) {
		$scope.currentRider = riderObj;
	});

	// Not sure if I need here.  Add args if needed up top.
	// UserFactory.getUserDetails()
	// .then(function(userDetails) {
	// 	console.log("userDetails", userDetails);
	// 	$scope.currentUser = userDetails[0];
	// 	console.log("viewArtCurrentUser", $scope.currentUser);
	// });	

});