// These lines calling the html elements and url, store in variables.
var searchBtn = document.getElementById("searchBtn");
var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?&q=city&cnt=6&exclude=hourly,daily&appid=5ee2ef72f8bcd5f71cb4cc0992822390&units=imperial";
var cityFormEl = document.querySelector('#city-form');
var userInputEl = document.querySelector('#userSearch');
var weatherContainerEl = document.querySelector('#weather-container');
var reportSearchTerm = document.querySelector('#report-search-term');
var cardHeaderEl = document.querySelector("#cardHead");
var fiveDaysReport = document.querySelector("#five-days-report");
var cityStoreEl = document.querySelector("#cityStore");
var curDate = moment().format("MM/DD/YYYY");
var userSearch = "";

// Main function start with first fetch.
function showSearch() {
   $(".showCity").empty();
 
   var allcities = JSON.parse(localStorage.getItem("cities")) || [];

   allcities.forEach(function (city){
       var listCity = document.createElement("li");
       listCity.setAttribute("class", "list-group-item");
       listCity.value = city;
       listCity.textContent = city;
       listCity.addEventListener("click", buttonSubmitHandler)                  
       $(".showCity").append(listCity);                                        
   })
};
// These function is main submit event handler.
var formSubmitHandler = function (event) {
   event.preventDefault();
   
   // These lines for hiding main card.
    //    document.getElementById("show-hide").classList.remove("hidden");

   
    // This line for removes whitespace from both ends of a string and returns a new string,
   userSearch = userInputEl.value.trim();
 
   // These lines checks get api fucntion's inputs are not empty.
   if (userSearch) {
       getApi("https://api.openweathermap.org/data/2.5/forecast?q=" + userSearch + "&cnt=6&exclude=hourly,daily&appid=5ee2ef72f8bcd5f71cb4cc0992822390&units=imperial");      
     weatherContainerEl.textContent = '';
     userInputEl.value = '';
   } else {
     alert('Please enter a City!');
   }
};
var buttonSubmitHandler = function (event) {
   event.preventDefault(); 

//    This line returns the element that triggered the event.
   userSearch = event.target.textContent;
 
   // These lines checks get api fucntion's inputs are not empty.
   if (userSearch) {
       getApi("https://api.openweathermap.org/data/2.5/forecast?q=" + userSearch + "&cnt=6&exclude=hourly,daily&appid=5ee2ef72f8bcd5f71cb4cc0992822390&units=imperial");      
     weatherContainerEl.textContent = '';
     userInputEl.value = '';
   } else {
     alert('Please enter a City!');
   }
};
// These lines are the main functions that who contain two fetch for user search.
function getApi(requestUrl) {
   let lat, lon;
   // First api cal for City name and lat and lon datas.
   fetch(requestUrl)
   .then(function (response)  {
       if (response.ok){
           response.json().then(function (data) {
          
               // These lines for declare data from api in variable.
               let cityName = data.city.name;
               let curTemp = data.list[0].main.temp;
               let curWind = data.list[0].wind.speed;
               let curHumid = data.list[0].main.humidity;
               lat = data.city.coord.lat;
               lon = data.city.coord.lon;
               // Second fetch URL.
               var fiveDaysUrl = "https://api.openweathermap.org/data/2.5/onecall?cnt=6&lat=" +

                        lat + "&lon=" + lon + "&exclude=minutely,hourly&appid=5ee2ef72f8bcd5f71cb4cc0992822390&units=imperial";
   // These lines second api call for pick up UV index.
   fetch(fiveDaysUrl)
   .then((res2) => {
               res2.json().then(function (data) {

               // This line declare UV index in variable.
               var curUV = data.current.uvi;

               // These lines display all data in main card.
               weatherContainerEl.innerHTML = "<h1>" + cityName + " (" + curDate + ") </h1><img src=http://openweathermap.org/img/w/"
               + data.current.weather[0].icon + ".png alt='Icon depicting current weather' width='50' height='50'><h3>Temp: "
               + curTemp + "</h3><h3>Wind Speed: " + curWind + "</h3><h3>Humidity: " + curHumid + "</h3><h3>UV Index: " + "<span id='UVI'>" + curUV + "</span>" + "</h3>";

            //    These lines for change color of uv index
               if (curUV <= 2 ) {
                   document.getElementById("UVI").style.backgroundColor = "green";
               }else if (curUV >2 && curUV <= 5) {
                   document.getElementById("UVI").style.backgroundColor = "orange";
               }else if (curUV > 5 && curUV <= 7 && curUV > 7){
                   document.getElementById("UVI").style.backgroundColor = "red";
               }

               // Add user input cities name in local storage.
               var allcities = JSON.parse(localStorage.getItem("cities")) || [];
               // allcities.push(userInputEl.value.trim());
               allcities.push(userSearch);
               
               localStorage.setItem("cities", JSON.stringify(allcities));

                // For display all data in the page.
               displayReport(data);
               showSearch()
                   })
               })
             
           });
       }else {
           alert("error: " + response.statusText);
       }
   // This lines catching the error and display alert note.
   }).catch(function (error) {
           alert("Try again.");
       });    
   };
   // Function that display data from api.
   var displayReport = function (searchTerm) {
       // This line is setting empty string, and clearing the data from previus research.
       fiveDaysReport.innerHTML = '';
       // for loop code for display five days datas in the cards.
       for (var i = 1; i < 6; i++) {
           // These lines display main date, with moment format the date.
           var titleEl = document.createElement("p");
           titleEl.textContent = moment.unix(searchTerm.daily[i].dt).format("MM/DD/YYYY");

           // These lines create img tag in html and set icon in variable, with its path.
           var iconEl = document.createElement("img");
           var iconSrcAttr = 'http://openweathermap.org/img/w/'+ searchTerm.daily[i].weather[0].icon + '.png';
           iconEl.setAttribute('src', iconSrcAttr);
           
           // These lines display main temprature.
           var tempEl = document.createElement("p");
           tempEl.textContent = "Temp: " + searchTerm.daily[i].temp.day;

           // These lines display main wind.
           var windEl = document.createElement("p");
           windEl.textContent = "Wind: " + searchTerm.daily[i].wind_speed;

           // These lines display main humidity.
           var humidEl = document.createElement("p");
           humidEl.textContent = "Humidity: " + searchTerm.daily[i].humidity;

           // These lines for create div element and display data from api.  
           var reportEl = document.createElement("div");
           reportEl.classList =  'list-item justify-space-between ';
           
           // These are data implementation to html.
           reportEl.appendChild(titleEl);
           reportEl.appendChild(iconEl);
           reportEl.appendChild(tempEl);
           reportEl.appendChild(windEl);
           reportEl.appendChild(humidEl);
           
           // These lines set five days data in html.
           fiveDaysReport.appendChild(reportEl);
       }      
   };
cityFormEl.addEventListener('submit', formSubmitHandler);




