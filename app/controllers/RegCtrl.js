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
		uid: "",
		isAdmin: false
	};

	$scope.save = function() {
		console.log('cluck');
		AuthFactory.createWithEmail($scope.newUser.email, $scope.password)
		.then(function(result) {
		// Result is the return of the promise with uid prop.  Its loggable.
		// Allowing to attach to the newUser object
		$scope.newUser.uid = result.uid;
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