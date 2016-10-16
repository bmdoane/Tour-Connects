"use strict";

app.controller('ArtCreateCtrl', function($scope, $location, AuthFactory, RidersFactory, UserFactory) {

	$scope.rider = {
		// Changed name from viewArtist.html input.  Revisit..
		name: "",
		genre: "",
		riderDate: "",
		tourContact: "",
		phone: "",
		email: "",
		lodging: "",
		backline: "",
		audio: "",
		lighting: "",
		stage: "",
		schedule: "",
		showRun: "",
		dressingRoom: "",
		catering: "",
		security: "",
		tickets: "",
		// addRider() places creator's uid, tying them to rider
		uid: "",
		// () places venue's uid tying them to the rider.  Copies posted to seperate FB key
		vuid: ""
	};

	$scope.addRider = function() {
		// add user id to new Board obj
		$scope.rider.uid = AuthFactory.getUser().uid;
		RidersFactory.postRiderFB($scope.rider)
		.then(function() {
			$location.url('/myArtists');
		});
	};

	// For isAdmin property on currentUser
	UserFactory.getUserDetails()
	.then(function(userDetails) {
		// console.log("userDetails", userDetails);
		$scope.currentUser = userDetails[0];
		// console.log("viewCreateCurrentUser", $scope.currentUser);
	});	

});