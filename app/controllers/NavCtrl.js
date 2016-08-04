"use strict";

app.controller('NavCtrl', function($scope, $location) {

	// Have to hit logout twice??
	$scope.logout = function() {
		firebase.auth().signOut()
		.then(function() {
			$location.url("/login");
			// This keeps you from having to hit logout btn twice
			$scope.$apply();
			console.log("You out");
		});
	};

	$scope.myArtistsLink = function() {
		if ($location.url() === '/myArtists') {
			return true;
		}
	};

	$scope.searchArtLink = function() {
		if ($location.url() === '/searchArt') {
			return true;
		}
	};

	// Path in appConfig includes routeParams which broke $location.url() === path
	// indexOf looks for (is this included) returning value greater than -1 
	$scope.viewArtLinks = function() {
		if ($location.url().indexOf('/viewArt') > -1) {
			return true;
		}
	};


});
