const myMap = L.map('mapArea').setView([34.0709, -118.444], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

let url = "https://spreadsheets.google.com/feeds/list/1MG1JovULPlyr4hx9da0ySu2ZqPd3yIGIN0lX1mQUyAE/ovjmjb4/public/values?alt=json"
fetch(url) //api request
	.then(response => {
		return response.json();
		})
    .then(data =>{
        console.log(data)
    })

function addMarker(data){
    L.marker([data.lat,data.long]).addTo(myMap).bindPopup(`<h2>${data.howdidyoumaketheappointment}</h2>`)
    return data.howdidyoumaketheappointment
}

let string = "hello some text"
let number = 10
let someList = [0,1,2,3,4]
let object = {"property": "hi", "name":"albert"}

// for of loop. like python for loops 
// for (const someThing of string){
//     console.log(someThing)
// }

// someList.forEach(checkingData) //like map function. only works on lists
let newList = ["hello", "lists", "cool"]

// newList.forEach(checkingData)
// for (let i = 0; i < newList.length; i++){
//     console.log(newList[i])
// }
// for (const i of newList){
//     console.log(i)
// }

// function checkingData(thisData){
//     console.log(thisData)
// }

//addMarker
// let messages = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]
// for (let i = 0; i < 10; i++){
//     addMarker(i, i, messages[i])
// }

// addMarker(37,-122,'home land!')

function processData(theData){
    const formattedData = [] /* this array will eventually be populated with the contents of the spreadsheet's rows */
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
    console.log(formattedData)
    formattedData.forEach(addMarker)
    // we can actually add functions here too
}

fetch(url)
	.then(response => {
		return response.json();
		})
    .then(data =>{
        // console.log(data)
        processData(data)
    })
