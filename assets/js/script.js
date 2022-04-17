// These lines calling the html elements and url, store in variables.
var searchBtn = document.getElementById("searchBtn");
var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?&q=city&cnt=6&exclude=hourly,daily&appid=5ee2ef72f8bcd5f71cb4cc0992822390&units=imperial";

var cityFormEl = document.querySelector('#city-form');
var userInputEl = document.querySelector('#userSearch');
var weatherContainerEl = document.querySelector('#weather-container');
var reportSearchTerm = document.querySelector('#report-search-term');
var cardHeaderEl = document.querySelector("#cardHead");
var fiveDaysReport = document.querySelector("#five-days-report");
var curDate = moment().format("MM/DD/YYYY");
var userSearch = "";

var formSubmitHandler = function (event) {
    event.preventDefault();

    userSearch = userInputEl.value.trim();
  
    if (userSearch) {
        getApi("https://api.openweathermap.org/data/2.5/forecast?q=" + userSearch + "&cnt=6&exclude=hourly,daily&appid=5ee2ef72f8bcd5f71cb4cc0992822390&units=imperial");
        
    //   cardHeaderEl.textContent = '';
      weatherContainerEl.textContent = '';
      userInputEl.value = '';
    } else {
      alert('Please enter a City!');
    }
};


function getApi(requestUrl) {
    let lat, lon;

    fetch(requestUrl)
    .then(function (response)  {
        if (response.ok){
            response.json().then(function (data) {
                // console.log(data);
               
                // These lines for declare data from api in variable.
                let cityName = data.city.name;
                // let curDate = data.list[0].dt_txt;
                // let curImg = "src=http://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png alt='Icon depicting current weather' width='50' height='50'";
                let curTemp = data.list[0].main.temp;
                let curWind = data.list[0].wind.speed;
                let curHumid = data.list[0].main.humidity;

                // // console.log("Temp:", data.list[0].main.temp,
                // "Humidity:", data.list[0].main.humidity,
                // "Wind speed:", data.list[0].wind.speed);

                lat = data.city.coord.lat;
                lon = data.city.coord.lon;

                // Second fetch URL.
                var fiveDaysUrl = "https://api.openweathermap.org/data/2.5/onecall?cnt=6&lat=" + 
                lat + "&lon=" + lon + "&exclude=minutely,hourly&appid=5ee2ef72f8bcd5f71cb4cc0992822390&units=imperial";

    // These lines second api call for pick up UV index.
    fetch(fiveDaysUrl)
    .then((res2) => {
                // console.log("weatherContainerEl", res2);
                res2.json().then(function (data) {
                // console.log(data);

                // This line declare UV index in variable.
                var curUV = data.current.uvi;

                // These lines display all data in main card.
                weatherContainerEl.innerHTML = "<h1>" + cityName + " (" + curDate + ") </h1><img src=http://openweathermap.org/img/w/" 
                + data.current.weather[0].icon + ".png alt='Icon depicting current weather' width='50' height='50'><h3>Temp: "
                + curTemp + "</h3><h3>Wind Speed: " + curWind + "</h3><h3>Humidity: " + curHumid + "</h3><h3>UV Index: " + curUV + "</h3>";

                // Add user input city name in local storage.
                localStorage.setItem("city", json.stringify({cityName}));
                
                // This line call back city name from local storage.
                // var memory = document.getElementById("cityStore").textContent = city.value;
                displayReport(data);
                // memory.appendChild(city);
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
        // console.log(response);
        // return response.json();       
    };

    // Function that display data from api.
    var displayReport = function (searchTerm) {
        // console.log(searchTerm);
        // if (data.daily.length === 0) {
        // weatherContainerEl.textContent = "No Report Found.";
        // return;
        // }  
        // reportSearchTerm.textContent = searchTerm;

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