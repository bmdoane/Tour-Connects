"use strict";

const app = angular.module('Tour-Connects', ['ngRoute'])
.constant('FirebaseURL', "https://tourconnectstwo.firebaseio.com");

app.config(function($routeProvider) {

	$routeProvider.
	when('/login', {
		templateUrl: 'partials/login.html',
		controller: 'LoginCtrl'
	}).
	when('/myArtists', {
		templateUrl: 'partials/myArtists.html',
		controller: 'MyArtistsCtrl'
	}).
	when('/searchArt', {
		templateUrl: 'partials/searchArtists.html',
		controller: 'ArtSearchCtrl'
	}).
	when('viewArt', {
		templateUrl: 'partials/viewArtists.html',
		controller: 'ArtViewCtrl'
	}).
	otherwise('login');
});