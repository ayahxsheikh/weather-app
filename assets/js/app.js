
//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

//https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}



var apiKey = '753dbaeb28d5f9e47d1357c0fbe984e8';
var baseURL = 'https://api.openweathermap.org/data/2.5/';
var currentURL = baseURL + `weather?appid=${apiKey}&units=metric&`;
var forecastURL = baseURL + `forecast?appid=${apiKey}&units=metric&`;
var iconURL = 'https://openweathermap.org/img/w/';

var mainWrapper = $('.main')
var topSec = $('.top')
var searchInput = $('#search-input')
var cityInput;
var historyEl = $('.search-history')
var forecastSec = $('.forecast-sec');
var todaySec = $('.display-today');
var citiesArr = [];
var cities = [];
var cityBtn;

// When key-enter is pressed
    //show current weather
    //show 5 day forecast
    //show search history
        //add city name to history
        //pull from local storage
        //if history is not empty, output each city to the webpage


function displayWeather(currentWeather){
    // clears forecast section on nect serach input
    todaySec.html(' ');

        todaySec.append( `
        <section class="today row">
          <div>
            <h2 class="city-name row justify-center">${currentWeather.name}</h2>
            <h3 class="today-date">${moment().format('DD/MM/YY')}</h3>
          <div>
            <div class="today-info column ">
              <img class="icon" src="${iconURL + currentWeather.weather[0].icon}.png">
              <h5 class="temp">Temp: ${Math.round(currentWeather.main.temp)} °C</h5>
              <h5 class="wind">Wind: ${Math.round(currentWeather.wind.speed)} KMP</h5>
              <h5 class="humidity">Humidity: ${Math.round(currentWeather.main.humidity)}%</h5>
            </div>
          </div>
        </section>`
        );
        
} 

function displayForecast(forecast){
    // clears forecast section on nect serach input
    forecastSec.html(' ');
    for (var  i = 0; i < forecast.list.length; i+=8) {
        
        forecastSec.append (` <div class="display-weather">
        <div class="forecast-card">
        <h4 class="date">${forecast.list[i].dt_txt}</h4>
        <img src="${iconURL + forecast.list[i].weather[0].icon}.png">
        <h5 class="temp">Temp: ${Math.round(forecast.list[i].main.temp)} °C</h5>
        <h5 class="wind">Wind: ${Math.round(forecast.list[i].wind.speed)} KMP</h5>
        <h5 class="humidity">Humidity: ${Math.round(forecast.list[i].main.humidity)}%</h5>
    </div>
    </div> `)
}
}

function previousCity(){
   var previousCity = JSON.parse(localStorage.getItem('city'))||[];
    
    console.log(previousCity );
    console.log('hello');
}

function getCityData (event){
    var keyCode = event.keyCode;
    var cityInput = searchInput.val();

    
    // console.log(citiesArr);
    
    if (keyCode === 13 && cityInput){
        // console.log(searchText)
        
        $.get(currentURL + `q=${cityInput}`)
        .then(function(currentData){
            // console.log(currentData);
            displayWeather(currentData);
            
            $.get(forecastURL + `lat=${currentData.coord.lat}&lon=${currentData.coord.lon}`)
            .then(function (forecastData){
                // console.log(forecastData)
                displayForecast(forecastData);
                
            });
            // ADDING LOCAL STORAGE
            //if statement inside the promise chain ensures only cities from API are store into localStorage rather than any input
                if (cityInput !== ''){
                    citiesArr.push(cityInput)
                    var setCity = localStorage.setItem('city', JSON.stringify(citiesArr));
                    console.log(citiesArr);

                    historyEl.append(`<button id="cityBtn" class="btn">${cityInput}</button>`)
                    $('#cityBtn').click(previousCity);
                }
            
                // return button, cityBtn;

        }); 
    } 
}


function init (){
    searchInput.keydown(getCityData);
    console.log('working');
}
init();


