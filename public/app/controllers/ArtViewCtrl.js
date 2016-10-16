"use strict";

app.controller('ArtViewCtrl', function($scope, RidersFactory, $routeParams, UserFactory, $location, SpotifyFactory, $rootScope) {

	// Routeparams prop can be any namespace, just needs to match app.config
	// Art Manager rider 
	RidersFactory.getRiderFB($routeParams.riderId)
		.then(function(riderObj) {
			// console.log("RiderObj", riderObj);
			$scope.currentRider = riderObj;
			// How can i get this out of here??
			SpotifyFactory.addArtistInfo($scope.currentRider.name)
			.then(function(artistDetails) {
				//console.log("artistDetails", artistDetails.artists.items[0].id);
				$scope.currentArtist = artistDetails;
			});
		});

	// Venue rider
	RidersFactory.getVenueRider($routeParams.riderId)
		.then(function(riderObj) {
			// console.log("VenRiderObj", riderObj);
			$scope.currentVenRider = riderObj;
			SpotifyFactory.addArtistInfo($scope.currentVenRider.name)
			.then(function(artistDetails) {
				//console.log("artistDetails", artistDetails.artists.items[0].id);
				$scope.currentArtist = artistDetails;
			});
		});

	RidersFactory.getVenueRiders()
		.then(function(riderObj) {
			$scope.allVenueRiders = riderObj;
			console.log("$scope.allVenueRiders", $scope.allVenueRiders);
			// Figure out condition that if array contains artist, add btn is hidden
		})

	RidersFactory.getUserRiders()
		.then(function(riderObj) {
			$scope.allUserRiders = riderObj
			console.log("$scope.allUserRiders", $scope.allUserRiders);
			// Figure out condition that if array contains artist, add btn is hidden			
		})

	// To use for venue.  If currentUser is !isAdmin
	UserFactory.getUserDetails()
		.then(function(userDetails) {
			$scope.currentUser = userDetails[0];
			// console.log("viewArtCurrentUser", $scope.currentUser);
		});

	// Add venueUserId to rider and post to FB (for myArtist venue view)
	$scope.addVenToRider = function(venueUserId) {
		$scope.currentRider.vuid = venueUserId;
		RidersFactory.postVenueRider($scope.currentRider)
		.then(function() {
			$location.url('/myArtists');
		});
	};
	
});
