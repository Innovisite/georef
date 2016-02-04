/*
 * Manage the dashboard data
 **/

(function(){
    
    angular.module('GeorefApp').
	directive('georefEdfData', function() {
	    return {
		templateUrl: 'build/html/EdfData.html'
	    };
	});
}());

