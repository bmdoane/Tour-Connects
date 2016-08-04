"use strict";

const app = angular.module('Tour-Connects', ['ngRoute'])
.constant('FirebaseURL', "https://tourconnectstwo.firebaseio.com");

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
		controller: 'MyArtistsCtrl'
	}).
	when('/searchArt', {
		templateUrl: 'partials/searchArtists.html',
		controller: 'ArtSearchCtrl'
	}).
	when('/viewArt/:riderId', {
		templateUrl: 'partials/viewArtist.html',
		controller: 'ArtViewCtrl'
	}).
	when('/artEdit/:riderId', {
		templateUrl: 'partials/artEdit.html',
		controller: 'ArtEditCtrl'
	}).
	when('/createRider', {
		templateUrl: 'partials/createRider.html',
		controller: 'ArtCreateCtrl'
	}).	
	otherwise('/login');
	
});