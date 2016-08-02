"use strict";

app.controller('NavCtrl', function($scope, $location) {

	// Have to hit logout twice??
	$scope.logout = function() {
		firebase.auth().signOut()
		.then(function() {
			console.log("You out");
			$location.url("/login");
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

// ng-if MyArtists show links for Artist Search and Logout
// ng-if ArtistSearch show links for MyArtists and Logout