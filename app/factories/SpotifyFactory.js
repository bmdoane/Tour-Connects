"use strict";

app.factory('SpotifyFactory', function($q, $http) {

	// Refactor this search to load artist view and populate page 
	const addArtistInfo = function(artist) {
		return $q(function(resolve, reject) {
			artist = artist.replace(/ /g, '+');
			let query = `q=${artist}&type=artist`;
			$http.get(`https://api.spotify.com/v1/search?${query}`)
			.success(function(artistObj) {
				console.log("artisObj", artisObj);
				resolve(artistObj);
			})
			.error(function(error) {
				reject(error);
			});
		});
	};

	return { addArtistInfo };

});