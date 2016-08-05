"use strict";

app.controller('ArtEditCtrl', function($scope, RidersFactory, $routeParams, $location) {

	RidersFactory.getRiderFB($routeParams.riderId)
	.then(function(riderObj) {
		console.log("editRiderObj", riderObj);
		$scope.currentRider = riderObj;
	});

  // keyId comes from firebase and the currentRider is returned object
	$scope.update = function() {
		RidersFactory.editRiderFB($scope.currentRider, $routeParams.riderId)
		.then(function(result) {
			console.log("update result", result);
			$location.url('/myArtists');
		});
	};

	$scope.delete = function() {
		console.log("$routeParams.riderId", $routeParams.riderId);
		RidersFactory.deleteRiderFB($routeParams.riderId)
		.then(function(result) {
			console.log("delete result", result);
			$location.url('/myArtists');
		});
	};		

});