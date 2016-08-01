"use strict";

app.controller('LoginCtrl', function($scope, $location, AuthFactory) {

	let vm = this;

	vm.login = function() {
		AuthFactory.authWithProvider()
			// Return of a promise
	    .then(function(result) {
	      $location.path("/myArtists");
	      vm.$apply();
			});
	};

});