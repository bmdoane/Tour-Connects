"use strict";

app.controller('MyArtistsCtrl', function($scope, UserFactory, RidersFactory, $timeout) {

	// Timeout is to load user before it attempts to load their riders
	$timeout(function() {
		RidersFactory.getUserRiders()
		.then(function(userRidersCollection) {
			$scope.userRiders = userRidersCollection;
			console.log("$scope.userRiders", $scope.userRiders);
		});
	}, 50);

	$timeout(function() {
		UserFactory.getUserDetails()
		.then(function(userDetails) {
			$scope.currentUser = userDetails;
			console.log("currentUser", $scope.currentUser);
		});
	}, 50);	
	

});