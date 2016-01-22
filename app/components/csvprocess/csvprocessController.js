/*
 * Manage the dashboard data
 **/

(function(){
    
    angular.module('GeorefApp').controller('CSVProcessController', [function(){

	L.Icon.Default.imagePath = 'assets/img/leaflet';

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

	var map = L.map('map_example1');
	var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
	var osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 18, attribution: osmAttrib});
	// start the map 
	map.setView(new L.LatLng(44.905, 5.786),14);
	map.addLayer(osm);

	Papa.parse("assets/data/edf_georef.csv",
		   {
		       download: true,
		       header: true,
		       complete: function(results) {
			   console.log(results);
			   var rows = results.data;
			   var rowTitles = rows.shift();
			   // create columns data and title
			   var cdata = [];
			   for(var key in rows[0]) {
			       cdata.push({ data: key, title: key });
			   }
			   rows.pop();
			   $("#example1").DataTable({
			       data: rows,
			       columns: cdata 
			   });
			   // now create geojson featurecollections
			   var geojsonFeatures = { type: "FeatureCollection",
						   features: [] };
			   for(var i = 0; i < rows.length; ++i) {
			       geojsonFeatures.features.push(
				   { type: "Feature",
				     properties: {
					 name: rows[i].PDL					 
				     },
				     geometry: {
					 type: "Point",
					 coordinates: [ rows[i].georef_lon,
							rows[i].georef_lat ]
				     }
				   });					 
			   }
			   L.geoJson(geojsonFeatures).addTo(map);
		       }
		   });
    }]);

}());
