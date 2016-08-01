"use strict";

app.controller('NavCtrl', function($scope, $location) {

	// Where do I console log to see if this works?
	$scope.logout = function() {
		firebase.auth().signOut()
		.then(function() {
			$location.url("/login");
		});
	};

	$scope.linkPath = function() {

	}


});

// ng-if MyArtists show links for Artist Search and Logout
// ng-if ArtistSearch show links for MyArtists and Logout