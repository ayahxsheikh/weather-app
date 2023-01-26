
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
var cityBtn;
var cities = JSON.parse(localStorage.getItem('cities')) || [];

function checkStorage (){
// checks if items are in local storage and creates buttons for them, func called in init.
    if(localStorage.getItem('cities')){
        cities = JSON.parse(localStorage.getItem('cities')) || [];
        
        for (let i = 0; i < cities.length; i++ ){
            
            var button = $("<button>");
            button.attr("class", "btn");
            button.attr("id", `${cities[i]}`);
            button.text(cities[i]);
            historyEl.append(button);
        };
    };
};

function displayWeather(currentWeather){
    // clears forecast section on next serach input
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
    // clears forecast section on next serach input
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

//Creates Buttons / Setting LocalStorage
function createButtons(cityInput){
  
// does not create a button for cities that are already stored in local storage
    if (cityInput) {
        cities.push(cityInput)
        console.log(cities)
    
    // for loop is not needed beucase this will only create one button for one city that is inputted at a time
        var button = $("<button>");
        button.attr("class", "btn");
        button.attr("id", `${cityInput}`);
        button.text(cityInput);
        historyEl.append(button);
  
        localStorage.setItem('cities', JSON.stringify(cities));
    }; 
    //clears input field after search is entered
    searchInput.val("");
   
};

// LISTENER FOR BUTTONS
historyEl.on('click', 'button', function(){
    // 'button' targets individual button in historyEl
    var cityCLick = $(this).text()
    console.log(cityCLick)
    getPreviousCities(cityCLick)
})

// GETS PREVIOUS DATA FROM BUTTONS
function getPreviousCities(cityInput){
    $.get(currentURL + `q=${cityInput}`)
        .then(function(currentData){
            // console.log(currentData);
            displayWeather(currentData);
            
            $.get(forecastURL + `lat=${currentData.coord.lat}&lon=${currentData.coord.lon}`)
            .then(function (forecastData){
                // console.log(forecastData)
                displayForecast(forecastData);
                
            });

        }); 
}

function getCityData (event){
    var keyCode = event.keyCode;
    var cityInput = searchInput.val();
    
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

            
        }); 
        createButtons(cityInput);
    } 
}


function init (){
    searchInput.keydown(getCityData);
    checkStorage();
};

init();


