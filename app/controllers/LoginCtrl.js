"use strict";

app.controller('LoginCtrl', function($scope, $location, AuthFactory) {

	// $scope.email = '';
	// $scope.password = '';

	$scope.login = function() {
		AuthFactory.authWithEmail($scope.email, $scope.password)
			// Return of a promise
	    .then(function(result) {
	      $location.path("/myArtists");
	      $scope.$apply();
			});
	};

	$scope.register = function() {
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