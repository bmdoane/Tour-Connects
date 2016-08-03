"use strict";

app.controller('MyArtistsCtrl', function($scope, AuthFactory, RidersFactory, $timeout) {

	// Timeout is to load user before it attempts to load their riders
	$timeout(function() {
		RidersFactory.getUserRiders()
		.then(function(userRidersCollection) {
			console.log("killinme");
			$scope.userRiders = userRidersCollection;
		});
	}, 50)

	$timeout(function() {
		$scope.theUser = AuthFactory.getUser();
		console.log("$scope.theUser", $scope.theUser);
	}, 50)

});