"use strict";

const app = angular.module('Tour-Connects', ['ngRoute'])
.constant('FirebaseURL', "https://tourconnectstwo.firebaseio.com");


let isAuth = ($location) => new Promise((resolve, reject) => {
	console.log("hey");
	let user = firebase.auth().currentUser;
  if (user) {
  		console.log("hey, hey");
    resolve();
    return true;    
  } else {
  	console.log("hey, hey, hey");
  	// What is difference between path and url? Url works.
  	$location.url('/login');
    reject();
    return false;    
  }
});

app.config(function($routeProvider) {

	$routeProvider.
	when('/login', {
		templateUrl: 'partials/login.html',
		controller: 'LoginCtrl'
	}).
	when('/register', {
		templateUrl: 'partials/reg.html',
		controller: 'RegCtrl'
	}).
	when('/myArtists', {
		templateUrl: 'partials/myArtists.html',
		controller: 'MyArtistsCtrl',
		resolve: { isAuth }
	}).
	when('/searchArt', {
		templateUrl: 'partials/searchArtists.html',
		controller: 'ArtSearchCtrl',
		resolve: { isAuth }		
	}).
	when('/viewArt/:riderId', {
		templateUrl: 'partials/viewArtist.html',
		controller: 'ArtViewCtrl',
		resolve: { isAuth }		
	}).
	when('/artEdit/:riderId/edit', {
		templateUrl: 'partials/artEdit.html',
		controller: 'ArtEditCtrl',
		resolve: { isAuth }		
	}).
	when('/createRider', {
		templateUrl: 'partials/createRider.html',
		controller: 'ArtCreateCtrl',
		resolve: { isAuth }		
	}).	
	otherwise('/login');

});