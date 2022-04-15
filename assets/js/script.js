var searchBtn = document.getElementById("searchBtn");
var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?&q=city&cnt=5&exclude=hourly,daily&appid=5ee2ef72f8bcd5f71cb4cc0992822390&units=imperial";

var cityFormEl = document.querySelector('#city-form');
var userInputEl = document.querySelector('#userSearch');
var weatherContainerEl = document.querySelector('#weather-container');
var reportSearchTerm = document.querySelector('#report-search-term');
var cardHeaderEl = document.querySelector("#cardHead");

var userSearch = "";

var formSubmitHandler = function (event) {
    event.preventDefault();

    var userSearch = userInputEl.value.trim();
  
    if (userSearch) {
        getApi("https://api.openweathermap.org/data/2.5/forecast?q=" + userSearch + "&cnt=5&exclude=hourly,daily&appid=5ee2ef72f8bcd5f71cb4cc0992822390&units=imperial");
        
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
                console.log(data);
                weatherContainerEl.innerHTML = "<h1>" + data.city.name + "</h1><img src=http://openweathermap.org/img/w/" + 
                data.list[0].weather[0].icon + ".png alt='Icon depicting current weather' width='50' height='50'><h3>Date: " 
                + data.list[0].dt_txt + "</h3><h3>Temp: " + data.list[0].main.temp + 
                "</h3><h3>Humidity: " + data.list[0].main.humidity + "</h3><h3>Wind Speed: " 
                + data.list[0].wind.speed + "</h3>";

                console.log("Temp:", data.list[0].main.temp,
                "Humidity:", data.list[0].main.humidity,
                "Wind speed:", data.list[0].wind.speed);

                lat = data.city.coord.lat;
                lon = data.city.coord.lon;

                var fiveDaysUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + userSearch + "&cnt=5&exclude=hourly,daily&appid=5ee2ef72f8bcd5f71cb4cc0992822390&units=imperial";

                fetch(fiveDaysUrl).then((res2) => {
                    console.log("weatherContainerEl", res2);
                })
                displayReport(data);
            });
        }else {
            alert("error: " + response.statusText);
        }
    }).catch(function (error) {
            alert("UPPPSSS");
        });
        // console.log(response);
        // return response.json();       
    };

    var displayReport = function (searchTerm) {
        console.log(searchTerm.list[0].weather[0].description);
        if (daily.length === 0) {
        weatherContainerEl.textContent = "No Report Found.";
        return;
        }  

        reportSearchTerm.textContent = searchTerm;

        for (var i = 0; i < daily.length; index++) {
            var report = daily[i];
           
            var reportEl = document.createElement("div");
            reportEl.classList =  'list-item flex-row justify-space-between align-center';

            // 
            reportEl.appendChild();
            // 
            weatherContainerEl.appendChild(reportEl);
        }
        
    };

cityFormEl.addEventListener('submit', formSubmitHandler);


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



    // .then(function (data) {
    //     console.log(data);
        
    // })
// getApi(requestUrl);

// responseText.textContent = response.data;