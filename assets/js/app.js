
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


function displayWeather(){
    for (var foreObj of forecast){
        topSec.append( `<section class=" display-today row justify-center">
        <section class="today row">
          <div>
            <h2 class="city-name row justify-center">${foreObj.city}</h2>
            <h3 class="today-date">28/12/2022</h3>
          <div>
            <div class="today-info column ">
              <h5 class="icon">Icon</h5>
              <h5 class="temp">Temp: ${foreObj.temp}</h5>
              <h5 class="wind">Wind: ${foreObj.wind}</h5>
              <h5 class="humidity">Humidity: ${foreObj.humidity}</h5>
            </div>
          </div>
        </section>
      </section>`
        );
    }
}

// function displayHistory



function getCityData (event){
    var keyCode = event.keyCode;
    var searchText = searchInput.val();
    
    if (keyCode === 13 && searchText){
        // console.log(searchText)
        displayWeather()
    }
}


function init (){
    searchInput.keydown(getCityData)
    console.log('working')
}
init();





var forecast = [
    {
    city: 'london',
    temp: '12C',
    wind: '2mph',
    humidity: '1ap'
    },

    {
    city: 'manchester',
    temp: '9C',
    wind: '6mph',
    humidity: '4ap'
    } 
    ];

