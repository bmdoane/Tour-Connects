"use strict";

app.controller('RegCtrl', function($scope, $location, AuthFactory, UserFactory) {

	// Establish new user object
	$scope.newUser = {
		firstName: "",
		lastName: "",
		company: "",
		address: "",
		phone: "",
		email: "",
		isAdmin: false
	};

	// $scope.addUser = function() {
	// 	AuthFactory.postUserFB($scope.newUser);
	// } 

	$scope.save = function() {
		console.log('cluck');
		AuthFactory.createWithEmail($scope.newUser.email, $scope.password)
		.then(function(result) {
		UserFactory.postUserFB($scope.newUser);			
		})
		.then(function(result) {
			$location.path('/myArtists');
			$scope.$apply();
		}).catch(function(err) {
      console.log(err);
    });
	};

});