const map = L.map('db8map').setView([34.0709, -118.444], 10); //argument to map() is id of a div. would a class work? maybe but probably shouldn't

// Leaflet tile layer, i.e. the base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//JavaScript let variable declaration to create a marker. not 100% sure how the code works
// let marker = L.marker([34.0709, -118.444]).addTo(map)
// 	.bindPopup('Math Sciences 4328 aka the Technology Sandbox<br> is the lab where I work in ')
// 	.openPopup();

// let marker2 = L.marker([35.0709, -118.444]).addTo(map)
// 	.bindPopup('new marker');

//not 100% sure how the code works. no matching promise for the then? i think the fetch provides a promise or something
fetch("maps/debate.geojson")
	.then(response => {
		return response.json();
		})
	.then(data =>{
		// Basic Leaflet method to add GeoJSON data
			// the leaflet method for adding a geojson
			L.geoJSON(data, {
				pointToLayer: function (feature, latlng) {
					return L.circleMarker(latlng, {color: feature.properties.color});
				}
			}).bindPopup(function (layer) {
				return layer.feature.properties.place;
			}).addTo(map);
		});