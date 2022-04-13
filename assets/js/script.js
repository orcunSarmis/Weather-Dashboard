var searchBtn = document.getElementById("searchBtn");
var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?q=city&units=metric&exclude=daily.temp&daily.humidity&daily.uvi&daily.wind_speed&appid=5ee2ef72f8bcd5f71cb4cc0992822390";
var responseText = document.getElementById("response-text");
var cityFormEl = document.querySelector('#city-form');
var userInputEl = document.querySelector('#userSearch');
var repoSearchTerm = document.querySelector('#repo-search-term');
var weatherContainerEl = document.querySelector('#weather-container');
var reportSearchTerm = document.querySelector('#report-search-term');

var formSubmitHandler = function (event) {
    event.preventDefault();

    var userSearch = userInputEl.value.trim();
  
    if (userSearch) {
      getApi("https://api.openweathermap.org/data/2.5/forecast?q=" + userSearch + "&exclude=daily.temp&daily.humidity&daily.uvi&daily.wind_speed&units=metric&appid=5ee2ef72f8bcd5f71cb4cc0992822390");
  
      weatherContainerEl.textContent = '';
      userInputEl.value = '';
    } else {
      alert('Please enter a City!');
    }
};


function getApi(requestUrl) {
    fetch(requestUrl)
    .then(function (response) {
        if (response.ok){
            response.json().then(function (data) {
                console.log(data);
                displayReport(data);
            });
        }else {
            alert("eError: " + response.statusText);
        }
    })
        .catch(function (error) {
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

            reportEl.appendChild();

            weatherContainerEl.appendChild(reportEl);
        }
        
    };

     


cityFormEl.addEventListener('submit', formSubmitHandler);

    // .then(function (data) {
    //     console.log(data);
        
    // })
// getApi(requestUrl);

// responseText.textContent = response.data;