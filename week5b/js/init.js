const myMap = L.map('mapArea').setView([34.0709, -118.444], 5);

const url = "https://spreadsheets.google.com/feeds/list/1upD99bKWIO68jL8MKWV67KE-_H_TVn2bCwqyQkqNsBw/oxw5dh3/public/values?alt=json"

let speakFluentEnglish = L.featureGroup();
let speakOtherLanguage = L.featureGroup();

let mapLayers = {
    "Speaks English": speakFluentEnglish,
    "Speaks Other Language": speakOtherLanguage
}

let circleOptions = {
    radius: 4,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
}

//use this to change map appearance
let Stamen_TonerLite = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
}).addTo(myMap);

fetch(url)
	.then(response => {
		return response.json();
		})
    .then(data =>{
                // console.log(data)
                formatData(data)
        }
)

let num_non_english = 0;

function addMarker(data){
    if(data.doyouspeakenglishfluently == "Yes"){
        circleOptions.fillColor = "Blue"
        speakFluentEnglish.addLayer(L.circleMarker([data.lat,data.lng], circleOptions).bindPopup(`<h2>Speak English fluently</h2>`))
        createButtons(data.lat,data.lng,data.location)
    }

    if(data.doyouspeakenglishfluently == "No"){
        circleOptions.fillColor = "Orange"
        speakOtherLanguage.addLayer(L.circleMarker([data.lat,data.lng], circleOptions).bindPopup(`<h2>Speak other languages</h2>`))
        createButtons(data.lat,data.lng,data.location)
    }
    return data.timestamp
}

function createButtons(lat,lng,title){
    const newButton = document.createElement("button");
    newButton.id = "button"+title;
    newButton.innerHTML = title;
    newButton.setAttribute("lat",lat); 
    newButton.setAttribute("lng",lng);
    newButton.addEventListener('click', function(){
        myMap.flyTo([lat,lng]);
    })
    const spaceForButtons = document.getElementById('contents')
    spaceForButtons.appendChild(newButton);
}

function formatData(theData){
        const formattedData = []
        const rows = theData.feed.entry
        for(const row of rows) {
          const formattedRow = {}
          for(const key in row) {
            if(key.startsWith("gsx$")) {
                  formattedRow[key.replace("gsx$", "")] = row[key].$t
            }
          }
          formattedData.push(formattedRow)
        }
        console.log(formattedData)
        formattedData.forEach(addMarker)    
        speakFluentEnglish.addTo(myMap)
        speakOtherLanguage.addTo(myMap)
        let allLayers = L.featureGroup([speakFluentEnglish,speakOtherLanguage]);
        myMap.fitBounds(allLayers.getBounds());       
}

L.control.layers(null, mapLayers).addTo(myMap)