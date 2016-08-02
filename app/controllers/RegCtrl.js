"use strict";

app.controller('RegCtrl', function($scope, $location, AuthFactory) {

	$scope.save = function() {
		console.log('cluck');
		AuthFactory.createWithEmail($scope.email, $scope.password)
		.then(function(result) {
			$location.path('/myArtists');
			$scope.$apply();
		}).catch(function(err) {
      console.log(err);
    });
	};

});