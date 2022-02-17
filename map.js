
var map,
	layer,
	city_latlng = [63.2, 75.44]
	;
	
function initMap(){

	map = L.map('mapid').setView(city_latlng, 9, 5);


	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);

	
	map.on('click', onMapClick);
	map.on('move',function(){	
					//markerCenter.setLatLng(map.getCenter());
	});
					
	var latlng1 = L.latLng(63.2, 75.44);
	var latlng2 = L.latLng(63.2, 76.445);
	
	var my_icon = L.icon({
		iconUrl: "logo.png" 
		,iconSize: [32, 32]
		,iconAnchor:   [12, 58]});

		var my_icon2 = L.divIcon({
			html: "logo.png" 
			});
		//layer = L.marker(latlng1, {icon: my_icon} ).addTo(map);

		var mmm = [];
		markser.forEach(function(e){
			var icon = L.divIcon({ 
				html: "<img width=32px src=\'logo.png\'/><div style=\"width : min-content; width: 32px; text-align: center;\">"+e.name+"</div>", 
				className: 'marker-my', 
				iconSize: new L.Point(20, 20) });
			layer = L.marker(e.lat_lng, {icon: icon} ).addTo(map)
			.bindPopup(e.street);
			//.openPopup();
			mmm.push(e.lat_lng);	
		});

		map.fitBounds(L.latLngBounds(mmm))
 		map.on('locationfound', onLocationFound);
		map.locate({watch:true, enableHighAccuracy: true});

	//.bindPopup('Click on Map for new position for layer')
    //.openPopup();
		
}
function onLocationFound(e) {
	if (typeof user_loc !== 'undefined'){
		user_loc.marker.setLatLng(e.latlng);
		user_loc.circle.setLatLng(e.latlng);
		user_loc.circle.setRadius(e.accuracy / 2);
	}else{
		user_loc = {
			loc : e,
			circle : L.circle(e.latlng, e.accuracy / 2).addTo(map),
			marker : L.marker(e.latlng).addTo(map)
		};
}
		//.bindPopup("You are within " + radius + " meters from this point").openPopup();
}

function onMapClick(e) {
	//mymap.setView(e.latlng, 14);
	//layer.animateTo(e.latlng, {duration: 1000, pan : 'inbounds', complete : function(){console.log('finish')}})
}



function isMarkerInsidePolygon(marker, poly) {
    var polyPoints = poly.getLatLngs();       
    var x = marker[0], y = marker[1];

    var inside = false;
    for (var i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {
        var xi = polyPoints[i].lat, yi = polyPoints[i].lng;
        var xj = polyPoints[j].lat, yj = polyPoints[j].lng;

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
};



