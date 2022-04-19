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

// These function is main submit event handler.
var formSubmitHandler = function (event) {
    event.preventDefault();

    // These lines for hiding main card.
    // if(show-con === inline) {
    //     document.getElementById("show-hide").style.display = "inline";
    // }else {
    //     document.getElementById("show-hide").style.display = "none";
    // }


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

// These lines are the main functions that who contain two fetch for user search.
function getApi(requestUrl) {
    let lat, lon;

    // First api cal for City name and lat and lon datas.
    fetch(requestUrl)
    .then(function (response)  {
        if (response.ok){
            response.json().then(function (data) {
                // console.log(data);
               
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
                + curTemp + "</h3><h3>Wind Speed: " + curWind + "</h3><h3>Humidity: " + curHumid + "</h3><h3>UV Index: " + curUV + "</h3>";

                if (curUV < 2 ) {
                    
                }

                // Add user input cities name in local storage.
                var allcities = JSON.parse(localStorage.getItem("cities")) || [];
                // allcities.push(userInputEl.value.trim());
                allcities.push(userSearch);
                
                localStorage.setItem("cities", JSON.stringify(allcities));
                // var sameCityAgain = "https://api.openweathermap.org/data/2.5/onecall?cnt=6&lat=" + allcities + "&exclude=minutely,hourly&appid=5ee2ef72f8bcd5f71cb4cc0992822390&units=imperial";

                // This lines make buttons for city names in the page, will iterate by user search.
                function showSearch() {

                    $(".list-group").empty();
                   
                    JSON.parse(localStorage.getItem("cities"));
                    console.log("working");
                
                    cities.forEach(function (city){
                        var listCity = document.createElement("li")
                        
                        listCity.setAttribute("class", "list-group-item");
                        listCity.value = city;
                        listCity.textContent = city;
                        listCity.addEventListener("click", searchCity)
                       
                        listGroup.append(listCity);                        
                
                    })
                };

                function searchCity(){
                    console.log(this.textContent)
                    weatherResults.empty();
                    forcastContainer.empty();
                    uvContainer.empty();
                    showSearch();
                    getWeather(this.textContent);
                        
                }
                // These lines remove dublicated buttons.
                // cityStoreEl.innerHTML = "";
                
                
                // for (let i = 0; i < allcities.length; i++) {
                //      let searchAgain = document.createElement("button");
                //      searchAgain.innerHTML = i;
                //      cityStoreEl.appendChild(searchAgain);
                //      searchAgain.addEventListener("click", function (event) {
                //         //  console.log(event.target.innerHTML);
                //          var sameCityAgain = "https://api.openweathermap.org/data/2.5/forecast?q=" + event.target.innerHTML + "&cnt=6&exclude=hourly,daily&appid=5ee2ef72f8bcd5f71cb4cc0992822390&units=imperial";
                //          getApi(sameCityAgain);
                //      });
                //      searchAgain.classList.add("city-btn");
                //      searchAgain.textContent = allcities[i];
                // }

                displayReport(data);
                
                    })
                })
               
            });
        }else {
            alert("error: " + response.statusText);
        }
    // This lines catching the error and display alert note. 
    }).catch(function (error) {
            alert("UPPPSSS");
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
            // console.log(searchTerm);

            // These lines create img tag in html and set icon in variable, with its path.
            var iconEl = document.createElement("img");
            var iconSrcAttr = 'http://openweathermap.org/img/w/'+ searchTerm.daily[i].weather[0].icon + '.png';
            iconEl.setAttribute('src', iconSrcAttr);
            
            // These lines display main temprature.
            var tempEl = document.createElement("p");
            tempEl.textContent = "Temp: " + searchTerm.daily[i].temp.day;
            // console.log(searchTerm);

            // These lines display main wind.
            var windEl = document.createElement("p");
            windEl.textContent = "Wind: " + searchTerm.daily[i].wind_speed;
            // console.log(searchTerm);

            // These lines display main humidity.
            var humidEl = document.createElement("p");
            humidEl.textContent = "Humidity: " + searchTerm.daily[i].humidity;
            // console.log(searchTerm);

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











// >>>>>>>>>>>>>>>>>>>
// if (notedHour < currentTime) {
//     $(this).addClass("past");
// }else if (currentTime === notedHour){
//     $(this).addClass("present");
// }else {
//     $(this).addClass("future");
// }
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>


/* <h3>" + data.current.uvi + "</h3> */
// ============================================
// function getApi(requestUrl) {
//     fetch(requestUrl)
//     .then(function (response) {
//         if (response.ok){
//             response.json().then(function (data) {
//                 console.log(data);
//                 weatherContainerEl.innerHTML = "<h1>" + data.city.name + "</h1><img src=http://openweathermap.org/img/w/" + 
//                 data.list[0].weather[0].icon + ".png alt='Icon depicting current weather' width='50' height='50'><h3>Date: " 
//                 + data.list[0].dt_txt + "</h3><h3>Temp: " + data.list[0].main.temp + 
//                 "</h3><h3>Humidity: " + data.list[0].main.humidity + "</h3><h3>Wind Speed: " 
//                 + data.list[0].wind.speed + "</h3>";

//                 console.log("Temp:", data.list[0].main.temp,
//                 "Humidity:", data.list[0].main.humidity,
//                 "Wind speed:", data.list[0].wind.speed
//                 );
//                 displayReport(data);
//             });
//         }else {
//             alert("error: " + response.statusText);
//         }
//     })
//         .catch(function (error) {
//             alert("UPPPSSS");
//         });
//         // console.log(response);
//         // return response.json();       
//     };


// var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?&q=city&cnt=5&exclude=hourly,daily&appid=5ee2ef72f8bcd5f71cb4cc0992822390&units=imperial";
// getApi("https://api.openweathermap.org/data/2.5/forecast?q=" + userSearch + "&cnt=5&exclude=hourly,daily&appid=5ee2ef72f8bcd5f71cb4cc0992822390&units=imperial");
// =============================================


// var repoSearchTerm = document.querySelector('#repo-search-term');
// var responseText = document.getElementById("response-text");
// &daily.humidity&daily.uvi&daily.wind_speed
// &daily.humidity&daily.uvi&daily.wind_speed




        
    // })
// getApi(requestUrl);


// =====================================================================================================>>>>>>>>>>>>>>>>>>>>>>>>

// //These lines calling the html elements and url, store in variables.
// var searchBtn = document.getElementById("searchBtn");
// var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?&q=city&cnt=5&exclude=hourly,daily&appid=5ee2ef72f8bcd5f71cb4cc0992822390&units=imperial";
// var cityFormEl = document.querySelector('#city-form');
// var userInputEl = document.querySelector('#userSearch');
// var weatherContainerEl = document.querySelector('#weather-container');
// var reportSearchTerm = document.querySelector('#report-search-term');
// var cardHeaderEl = document.querySelector("#cardHead");
// var fiveDaysReport = document.querySelector("#five-days-report");
// var curDate = moment().format("MM/DD/YYYY");
// var userSearch = "";
// var formSubmitHandler = function (event) {
//    event.preventDefault();
//    userSearch = userInputEl.value.trim();
 
//    if (userSearch) {
//        getApi("https://api.openweathermap.org/data/2.5/forecast?q=" + userSearch + "&cnt=5&exclude=hourly,daily&appid=5ee2ef72f8bcd5f71cb4cc0992822390&units=imperial");
       
//    //   cardHeaderEl.textContent = '';
//      weatherContainerEl.textContent = '';
//      userInputEl.value = '';
//    } else {
//      alert('Please enter a City!');
//    }
// };
// function getApi(requestUrl) {
//    let lat, lon;
//    fetch(requestUrl)
//    .then(function (response)  {
//        if (response.ok){
//            response.json().then(function (data) {
//                console.log(data);
//                // weatherContainerEl.innerHTML = "<h1>" + data.city.name + "</h1><img src=http://openweathermap.org/img/w/" +
//                // data.list[0].weather[0].icon + ".png alt='Icon depicting current weather' width='50' height='50'><h3>Date: "
//                // + data.list[0].dt_txt + "</h3><h3>Temp: " + data.list[0].main.temp +
//                // "</h3><h3>Humidity: " + data.list[0].main.humidity + "</h3><h3>Wind Speed: "
//                // + data.list[0].wind.speed + "</h3>";
               
//                let cityName = data.city.name;
//                // let curDate = data.list[0].dt_txt;
//                // let curImg = "src=http://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png alt='Icon depicting current weather' width='50' height='50'";
//                let curTemp = data.list[0].main.temp;
//                let curWind = data.list[0].wind.speed;
//                let curHumid = data.list[0].main.humidity;
//                console.log("Temp:", data.list[0].main.temp,
//                "Humidity:", data.list[0].main.humidity,
//                "Wind speed:", data.list[0].wind.speed);
//                lat = data.city.coord.lat;
//                lon = data.city.coord.lon;
//                // var fiveDaysUrl = "https://api.openweathermap.org/data/2.5/onecall?cnt=5&lat=" +
//                // lat + "&lon=" + lon + "&exclude=minutely,hourly&appid=5ee2ef72f8bcd5f71cb4cc0992822390&units=imperial";
//                var fiveDaysUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=5ee2ef72f8bcd5f71cb4cc0992822390";
//    // These lines second api call for pick up UV index.
//    fetch(fiveDaysUrl)
//    .then((res2) => {
//                console.log("weatherContainerEl", res2);
//                res2.json().then(function (data) {
//                console.log(data);
//                displayReport(data);
//                // Declasre UV index in variable.
//                var curUV = data.current.uvi;
//                // These lines display all data in main card.
//                weatherContainerEl.innerHTML = "<h1>" + cityName + " (" + curDate + ") </h1><img src=http://openweathermap.org/img/w/"
//                + data.current.weather[0].icon + ".png alt='Icon depicting current weather' width='50' height='50'><h3>Temp: "

//                 + curTemp + "</h3><h3>Wind Speed: " + curWind + "</h3><h3>Humidity: " + curHumid + "</h3><h3>UV Index: " + curUV + "</h3";
//                    })
//                })
//                displayReport(data);
//            });
//        }else {
//            alert("error: " + response.statusText);
//        }
//    // This lines catching the error and display alert note.
//    }).catch(function (error) {
//            alert("UPPPSSS");
//        });
//        // console.log(response);
//        // return response.json();      
//    };
//    //
//    var displayReport = function (searchTerm) {
//        console.log("This is the search results",searchTerm.list);
//        // if (data.daily.length === 0) {
//        // weatherContainerEl.textContent = "No Report Found.";
//        // return;
//        // }  
//        // reportSearchTerm.textContent = searchTerm;

//        for (var i = 0; i < searchTerm.list.length; i=i+8) {
         
//            console.log(moment.unix(searchTerm.list[i].dt).format("MM/DD/YYYY"))
           
//            // These lines display main date, with moment format the date.
//            var titleEl = document.createElement("p");
//            titleEl.textContent = moment.unix(searchTerm.list[i].dt).format("MM/DD/YYYY");
//            console.log(searchTerm);
//            // These lines display main temprature.
//            var tempEl = document.createElement("p");
//            tempEl.textContent = "Temp: " + searchTerm.list[i].main.temp;
//            console.log(searchTerm);
//            // These lines display main wind.
//            var windEl = document.createElement("p");
//            windEl.textContent = "Wind: " + searchTerm.list[i].wind.speed;
//            console.log(searchTerm);
//            // These lines display main humidity.
//            var humidEl = document.createElement("p");
//            humidEl.textContent = "Humidity: " + searchTerm.list[i].main.humidity;
//            console.log(searchTerm);
//            // var report = data.daily[i].;
         
//            var reportEl = document.createElement("div");
//            reportEl.classList =  'list-item justify-space-between align-center';

//            // These are data implementation to html.
//            reportEl.appendChild(titleEl);
//            reportEl.appendChild(tempEl);
//            reportEl.appendChild(windEl);
//            reportEl.appendChild(humidEl);

//            //
//            fiveDaysReport.appendChild(reportEl);
       
//    }
       
//    };
//     // this line is input eventlistner.
//     cityFormEl.addEventListener('submit', formSubmitHandler);

// =================================================================================================================================================

// ***************************************************************************************
                // weatherContainerEl.innerHTML = "<h1>" + data.city.name + "</h1><img src=http://openweathermap.org/img/w/" + 
                // data.list[0].weather[0].icon + ".png alt='Icon depicting current weather' width='50' height='50'><h3>Date: " 
                // + data.list[0].dt_txt + "</h3><h3>Temp: " + data.list[0].main.temp + 
                // "</h3><h3>Humidity: " + data.list[0].main.humidity + "</h3><h3>Wind Speed: " 
                // + data.list[0].wind.speed + "</h3>";


                          // iconEl.textContent = searchTerm."<img src=http://openweathermap.org/img/w/" 
            // + data.current.weather[i].icon + ".png alt='Icon depicting current weather' width='50' height='50'>;

            // <img src=http://openweathermap.org/img/w/" 
            //     + data.current.weather[0].icon + ".png alt='Icon depicting current weather' width='50' height='50'>

            // memory.appendChild(city);

                    // console.log(searchTerm);
        // if (data.daily.length === 0) {
        // weatherContainerEl.textContent = "No Report Found.";
        // return;
        // }  
        // reportSearchTerm.textContent = searchTerm;

                        // localStorage.setItem("city", JSON.stringify({city}));
                // var city = localStorage.getItem("cityName");

                // searchBtn.addEventListener('click', () => {
                //     city.push(userInputEl.value);
                //     console.log( value);
                // })
                // This line call back city name from local storage.
                // var memory = document.getElementById("cityStore").textContent = city.value;

                                // // console.log("Temp:", data.list[0].main.temp,
                // "Humidity:", data.list[0].main.humidity,
                // "Wind speed:", data.list[0].wind.speed);

                                // let curDate = data.list[0].dt_txt;
                // let curImg = "src=http://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png alt='Icon depicting current weather' width='50' height='50'";


                    //   cardHeaderEl.textContent = '';

                                   // userInputEl.value = '';
                // userSearch ='';
                // localStorage.setItem("cities", JSON.stringify(allcities));

                // allcities = allcities.filter(element => {
                //     return element !== '';
                // });