var searchBtn = document.getElementById("searchBtn");
var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=city&units=metric&exclude=daily.temp&daily.humidity&daily.uvi&daily.wind_speed&appid=5ee2ef72f8bcd5f71cb4cc0992822390";
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
      getApi("https://api.openweathermap.org/data/2.5/weather?q=city&units=metric&exclude=daily.temp&daily.humidity&daily.uvi&daily.wind_speed&appid=5ee2ef72f8bcd5f71cb4cc0992822390");
  
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
        weatherContainerEl.textContent = "No Report Found.";
        return;
        reportSearchTerm.textContent = searchTerm;

        // repoContainerEl.appendChild();
    };

     
    // .then(function (data) {
    //     console.log(data);
        
    // })
getApi(requestUrl);

cityFormEl.addEventListener('submit', formSubmitHandler);

// responseText.textContent = response.data;