"use strict";

app.controller('ArtSearchCtrl', function($scope, RidersFactory, $timeout) {

	$timeout(function() {
		$('#search').focus(); // Look at ng-focus - get jquery out
	}, 50);

	RidersFactory.getAllRidersFB()
	.then(function(riderCollection) {
		// console.log("XXXriderCollection", riderCollection);
		$scope.riders = riderCollection;
	});


});