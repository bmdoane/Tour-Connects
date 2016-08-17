"use strict";

app.controller('LoginCtrl', function($scope, $location, AuthFactory) {

	$scope.login = function() {
		AuthFactory.authWithEmail($scope.email, $scope.password)
			// Return of a promise
	    .then(function() { // Had result in here
	      $location.path("/myArtists");
	      $scope.$apply();
			});
	};

	$scope.register = function() {
		$location.path("/register");
	};

});