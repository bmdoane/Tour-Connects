"use strict";

app.controller('ArtEditCtrl', function($scope, RidersFactory, $routeParams, $location) {

	RidersFactory.getRiderFB($routeParams.riderId)
	.then(function(riderObj) {
		console.log("riderObj", riderObj);
		$scope.currentRider = riderObj;
	});

	$scope.update = function() {
		RidersFactory.editRiderFB($routeParams.riderId)
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