const lat = 34.0709;
const long = -118.444;
const settings = {center:[lat, long], zoom: 5}
const myMap = L.map('mapArea').setView(settings.center, settings.zoom);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

//test to see if variable is passed by reference or value by seeing if I can pass in map
// Step 1 adding to our addMarker function
function addMarker(lat,lng,title,message){
    console.log(message)
    L.marker([lat,lng]).addTo(myMap).bindPopup(`<h2>${title}</h2>`)
    createMarkerButtons(lat,lng,title); // automatically adds a button that jumps to the marker at the bottom of the page
    return message
}

//creates a button, sets an id, attribute, and label based on title. does not configure an event listener. returns button object (i think it's a reference?)
function createButton(title){
    const newButton = document.createElement("button") //create the element
    newButton.id = "button"+title; //make sure the button has a unique id
    newButton.innerHTML = title; //make sure button has a label by modifying html w/in the braces
    newButton.setAttribute("title", title) //give newButton an attribute
    return newButton
}
//https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
//can pass in a function or define it w/in the argument itself

function createMarkerButtons(lat,lng,title){
    const newButton = createButton(title)
    newButton.setAttribute("lat",lat); // sets the latitude 
    newButton.setAttribute("lng",lng); // https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute
    newButton.addEventListener('click', function(){
        myMap.flyTo([lat,lng]); //this is the flyTo from Leaflet but using "myMap" as the target
    })
    document.body.appendChild(newButton); //this adds the button to our page. https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild
}


/*===================MAIN BODY==================*/

//add some markers to interact with
class Location{
    constructor(lat, long, name) {
        this.lat = lat
        this.long = long 
        this.name = name
    }
} //i am trying to learn javascript so I decided to play around with arrays, classes, and for loops

//add some cool locations that will then become markers on the map
let locations = [
    new Location(34.0709, -118.444, 'Campus'), 
    new Location(34.7409, -122.484, "lots of water"), 
    new Location(39.7409, -122.484, 'basically oregon'), 
    new Location(27.322130889452172, -74.11727409924683, 'spooky ocean triangle'), 
    new Location(51.55714108344195, -0.08166072546112864, "it's coming home"), 
    new Location(63.0249106377718, 90.67977361080705, 'big')
]

for (let i = 0; i < locations.length; i++){
    addMarker(locations[i].lat, locations[i].long, locations[i].name)
}

//create two new buttons: one to zoom the map in, another to zoom the map out
//okay so this is kind of useless because you can already do this in the top left but you know what we're learning baby let's go
zIn = createButton("Zoom In")
zIn.addEventListener('click', function(){
    myMap.zoomIn()
})

zOut = createButton("Zoom Out")
zOut.addEventListener('click', function(){
    myMap.zoomOut()
})

document.body.appendChild(zIn)
document.body.appendChild(zOut)


