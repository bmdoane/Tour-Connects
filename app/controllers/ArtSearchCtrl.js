"use strict";

app.controller('ArtSearchCtrl', function($scope, RidersFactory) {

	RidersFactory.getAllRidersFB()
	.then(function(riderCollection) {
		console.log("XXXriderCollection", riderCollection);
		$scope.riders = riderCollection;
	});


});