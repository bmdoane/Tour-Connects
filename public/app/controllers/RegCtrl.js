"use strict";

app.controller('RegCtrl', function($scope, $location, AuthFactory, UserFactory, $anchorScroll, $timeout) {

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

	$timeout(function() {
		$location.hash('navy')
  	$anchorScroll(); // Read docs
		$('#first_name').focus(); // Look at ng-focus - get jquery out
	}, 50);	

	$scope.save = function() {
		AuthFactory.createWithEmail($scope.newUser.email, $scope.password)
		.then(function(result) {
		// Result is the return of the promise with uid prop.  Its loggable.
		// Allowing to attach to the newUser object
		$scope.newUser.uid = result.uid;
		UserFactory.postUserFB($scope.newUser);			
		})
		.then(function() { // Had result in here
			$location.path('/myArtists');
			$scope.$apply();
		}).catch(function(err) {
      console.log(err);
    });
	};

});