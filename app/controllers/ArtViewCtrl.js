"use strict";

app.controller('ArtViewCtrl', function($scope, $location, AuthFactory, RidersFactory) {

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
		uid: ""
	};

	// Think I need to have a promise return where I push rider into Art Man Array
	$scope.addRider = function() {
		console.log("addRiderFired");
		// add user id to new Board obj
		$scope.rider.uid = AuthFactory.getUser();
		// run post function to firebase
		RidersFactory.postRiderFB($scope.rider)
		.then(function() {
			$location.url("/myArtists");
		});
	};

});