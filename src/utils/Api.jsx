// var Fetch = require('whatwg-fetch');

var Api = {
	get: function(url) {
		return fetch(url, {
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(function(response){
			return response.json();
		});
	},
};

export default Api;