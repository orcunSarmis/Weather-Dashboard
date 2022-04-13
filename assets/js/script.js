var searchBtn = document.getElementById("searchBtn");
var requestUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=30.489772&lon=-99.771335&units=metric&exclude=daily.temp&daily.humidity&daily.uvi&daily.wind_speed&appid=5ee2ef72f8bcd5f71cb4cc0992822390";
var responseText = document.getElementById("response-text");
var cityFormEl = document.querySelector('#city-form');
var userInputEl = document.querySelector('#userSearch');
var repoSearchTerm = document.querySelector('#repo-search-term');
var repoContainerEl = document.querySelector('#repos-container');

var formSubmitHandler = function (event) {
    event.preventDefault();

    var userSearch = userInputEl.value.trim();
  
    if (userSearch) {
      getApi(userSearch);
  
      repoContainerEl.textContent = '';
      userInputEl.value = '';
    } else {
      alert('Please enter a City!');
    }
};


function getApi(requestUrl) {
    fetch(requestUrl)
    .then(function (response) {
        console.log(response);
        return response.json();
        
    })
    .then(function (data) {
        console.log(data);
        
    })
}
getApi(requestUrl);

cityFormEl.addEventListener('submit', formSubmitHandler);

// responseText.textContent = response.data;