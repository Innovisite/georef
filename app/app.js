(function(){

	// Defining a new app: Georef
	var app = angular.module('GeorefApp',['ngRoute']);

	// Configure routes
	app.config(['$routeProvider',
	  function($routeProvider) {
	    $routeProvider.
	      when('/csvprocess', {
		  templateUrl: 'build/html/csvprocessView.html'
	    }).
	      otherwise({
	        redirectTo: '/csvprocess'
	      });
	}]);
}());
