/*
 * Manage the dashboard data
 **/

(function(){
    
    angular.module('GeorefApp').
	controller('CSVProcessController', 
		   [
		       '$scope',
		       '$compile',
		       function(
			   $scope,
			   $compile
		       ) {

			   L.Icon.Default.imagePath = 'assets/img/leaflet';

			   angular.extend($scope, {
			       lamure: {
				   lat: 44.905,
				   lng: 5.786,
				   zoom: 14
			       },
			       data: { 
				   markers: {},
				   rows: []
			       },
			       defaults: {
				   tileLayer: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
				   tileLayerOptions: {
				       minZoom: 8,
				       maxZoom: 18
				   }
			       }
			   });

			   $scope.update = function() {

			       Papa.parse("assets/data/edf_georef.csv",
					  {
					      download: true,
					      header: true,
					      complete: function(results) {
						  var rows = results.data;
						  var rowTitles = rows.shift();
						  // create columns data and title
						  var cdata = [];
						  for(var key in rows[0]) {
						      cdata.push({ data: key, title: key });
						  }
						  rows.pop();
						  $scope.data.rows = rows;
						  $("#example1").DataTable({
						      language: {
							  url: "assets/datatables/French.json"
						      },
						      data: rows,
						      columns: cdata 
						  });
						  // now create markers
						  $scope.data.markers = {};
						  var markers = {};
						  for(var i = 0; i < rows.length; ++i) {
						      var elt = rows[i];
						      var key = elt.PDL;
						      var msgStr = "<georef-edf-data></georef-edf-data>";
						      markers[key] = {
							  lat: parseFloat(rows[i].georef_lat),
							  lng: parseFloat(rows[i].georef_lon),
							  getMessageScope: function() { 
							      var infoScope = $scope.$new(true);
							      infoScope.elt = elt;
							      return infoScope; 
							  },
							  compileMessage: true,
							  message: msgStr
						      };
						  }
						  $scope.data.markers = markers;
					      }
					  });
			   };
		       }]).
	directive('georefCsvProcess', function() {
	    return {
		link: function(scope, element, attr) {
		    
		    //Make the dashboard widgets sortable Using jquery UI
		    $(".connectedSortable").sortable({
			placeholder: "sort-highlight",
			connectWith: ".connectedSortable",
			handle: ".box-header, .nav-tabs",
			forcePlaceholderSize: true,
			zIndex: 999999
		    });
		    $(".connectedSortable .box-header, .connectedSortable .nav-tabs-custom").css("cursor", "move");
		    
		    //bootstrap WYSIHTML5 - text editor
		    $(".textarea").wysihtml5();
		    
		    /* jQueryKnob */
		    $(".knob").knob();

		    scope.update();

		},
		templateUrl: 'build/html/csvprocessView.html'
	    };
	});

}());
