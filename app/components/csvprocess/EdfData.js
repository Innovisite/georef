/*
 * Manage the dashboard data
 **/

(function(){
    
    angular.module('GeorefApp').
	controller('EdfData',
		   [
		       '$scope',
		       function(
			   $scope
		       ) {
		       }]).
	directive('georefEdfData', function() {
	    return {
		scope: {
		    elt: "="
		},
		templateUrl: 'build/html/EdfData.html'
	    };
	});
}());

