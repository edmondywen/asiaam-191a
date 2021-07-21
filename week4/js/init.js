const myMap = L.map('mapArea').setView([34.0709, -118.444], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

let url = "https://spreadsheets.google.com/feeds/list/1MG1JovULPlyr4hx9da0ySu2ZqPd3yIGIN0lX1mQUyAE/ovjmjb4/public/values?alt=json"
fetch(url) //api request
.then(response => {
  return response.json();
  })

function addMarker(data){
    L.marker([data.lat,data.long]).addTo(myMap).bindPopup(`<h2>${data.coolstorybro}</h2>`)
    return data.coolstorybro
}

function createButton(title){
  const newButton = document.createElement("button") //create the element
  newButton.id = "button"+title; //make sure the button has a unique id
  newButton.innerHTML = title; //make sure button has a label by modifying html w/in the braces
  newButton.setAttribute("title", title); //give newButton an attribute
  return newButton;
}

//create story swapping buttons
prevLoc = createButton("Previous Story");
nextLoc = createButton("Next Story");
controls = document.getElementById('controls')
controls.appendChild(prevLoc)
controls.appendChild(nextLoc)

const formattedData = []
function processData(theData){
     /* this array will eventually be populated with the contents of the spreadsheet's rows */
    const rows = theData.feed.entry // this is the weird Google Sheet API format we will be removing
    // we start a for..of.. loop here 
    for(const row of rows) { 
      const formattedRow = {}
      for(const key in row) {
        // time to get rid of the weird gsx$ format...
        if(key.startsWith("gsx$")) {
              formattedRow[key.replace("gsx$", "")] = row[key].$t
        }
      }
      // add the clean data
      formattedData.push(formattedRow)
    }
    // lets see what the data looks like when its clean!
    //console.log(formattedData)
    formattedData.forEach(addMarker)
    return formattedData;
    // we can actually add functions here too
}

function setter(your_var, value){
  your_var = value;
  console.log(your_var)
}

let newData;
fetch(url)
	.then(response => {
		return response.json();
		})
  .then(data =>{
    return processData(data)
  })  
  .then(result => {
    console.log(result)
    setter(result, newData)
  });

console.log(newData)

let test = [1, 2]
setter(test, [3, 4])
console.log("test is", test)

// console.log("am here")
// console.log(formattedData)
// //console.log(formattedData[0].lat)
// console.log("Length is: " + formattedData.length)