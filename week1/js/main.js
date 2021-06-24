// JavaScript const variable declaration
const map = L.map('map').setView([34.0709, -118.444], 15); //map is the target that it's looking for. corresponds to a css class or id 
//34.07 is latitude, -118 is longitude.

// Leaflet tile layer, i.e. the base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//JavaScript let variable declaration to create a marker
let marker = L.marker([34.0709, -118.444]).addTo(map).bindPopup('Math Sciences 4328 aka the Technology Sandbox<br> is the lab where I work in ')

let Huntington = L.marker([34.132477, -118.114695]).addTo(map).bindPopup('Huntington Library pog')