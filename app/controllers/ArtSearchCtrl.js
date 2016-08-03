"use strict";

app.controller('ArtSearchCtrl', function($scope, RidersFactory) {

	RidersFactory.getAllRidersFB()
	.then(function(riderCollection) {
		$scope.riders = riderCollection;
	});


});