
//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

//https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}



var apiKey = '753dbaeb28d5f9e47d1357c0fbe984e8';
var baseURL = 'https://api.openweathermap.org/data/2.5/';
var weatherURL = baseURL + `weather?appid=${apiKey}&units=metric&`;
var forecastURL = baseURL + `forecast?appid=${apiKey}&units=metric&`;

var mainWrapper = $('.main')
var topSec = $('.top')
var searchInput = $('#search-input')
var asideEl = $('.search-form')

// When key-enter is pressed
    //show current weather
    //show 5 day forecast
    //show search history
        //add city name to history
        //pull from local storage
        //if history is not empty, output each city to the webpage


//create history-block with button-Els and append to asideEl
//create weather-today block and append to topSec









