"use strict";

app.controller('NavCtrl', function($scope, $location) {

	// Have to hit logout twice??
	$scope.logout = function() {
		firebase.auth().signOut()
		.then(function() {
			$location.url("/login");
			// This keeps you from having to hit logout twice
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

	$scope.viewArtLinks = function() {
		if ($location.url() === '/viewArt') {
			return true;
		}
	};


});
