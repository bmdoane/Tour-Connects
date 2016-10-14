"use strict";

app.controller('ArtViewCtrl', function($scope, RidersFactory, $routeParams, UserFactory, $location, SpotifyFactory, $rootScope) {

	// To allow !isAdmin to see artistSearch link results
	// Path should be a string
	// Need function here.  
	// $scope.currentPath = $location.path();
	// console.log("$scope.currentP", $scope.currentPath);
	// $scope.SumFun = () => {
		// If (!currentUser.isAdmin && currentPath === '#/viewArt/{{rider.id}}') {
		// show viewArtist/venueView 
		// } else {
		//	show viewArtist/artManView
		// }

	// To grab last item in array
	// var last = arr.slice(-1)[0]	

	let pathHistory = []
  $rootScope.$on('$routeChangeSuccess', function() {
    pathHistory.push($location.path());
    console.log("pathHistory", pathHistory);
  });

	// Routeparams prop can be any namespace, just needs to match app.config
	// Art Manager rider 
	RidersFactory.getRiderFB($routeParams.riderId)
	.then(function(riderObj) {
		console.log("RiderObj", riderObj);
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
		console.log("VenRiderObj", riderObj);
		$scope.currentVenRider = riderObj;
		SpotifyFactory.addArtistInfo($scope.currentVenRider.name)
		.then(function(artistDetails) {
			//console.log("artistDetails", artistDetails.artists.items[0].id);
			$scope.currentArtist = artistDetails;
		});
	});

	// To use for venue.  If currentUser is !isAdmin
	UserFactory.getUserDetails()
	.then(function(userDetails) {
		// console.log("ArtViewUserDetails", userDetails);
		$scope.currentUser = userDetails[0];
		console.log("viewArtCurrentUser", $scope.currentUser);
	});

	// Add venueUserId to rider and post to FB (for myArtist venue view)
	$scope.addVenToRider = function(venueUserId) {
		// console.log("venueUserId", venueUserId);
		$scope.currentRider.vuid = venueUserId;
		RidersFactory.postVenueRider($scope.currentRider)
		.then(function() {
			$location.url('/myArtists');
		});
	};

	// if venrider has vuid don't show the button
	// $scope.showVenBtn = function() {
	// 	$scope.venueAdded = $scope.currentVenRider.vuid !== '';
	// 	return !$scope.currentUser.isAdmin && $scope.venueAdded;
	// }

});
