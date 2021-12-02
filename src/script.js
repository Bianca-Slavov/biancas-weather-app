//Date
let now = new Date();

let currentDay = document.querySelector("#currentDay");
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

currentDay.innerHTML = `${day} ${hours}:${minutes}`;

//Celcius & Fahrenheit
function showFahrenheit(event) {
  event.preventDefault();
  let currentFahrenheit = document.querySelector("#current-day-temperature");
  currentFahrenheit.innerHTML = 66;
}

let fahrenheit = document.querySelector(".fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);

function showCelsius(event) {
  event.preventDefault();
  let currentCelsius = document.querySelector("#current-day-temperature");
  currentCelsius.innerHTML = 17;
}

let celsius = document.querySelector(".celsius");
celsius.addEventListener("click", showCelsius);

//Weather
function showWeatherCondition(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#current-day-temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#windspeed").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function searchCity(city) {
  let apiKey = "bad8df618c99f7689be26e10f430a853";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "bad8df618c99f7689be26e10f430a853";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeatherCondition);
}

//GEO
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#city-position");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Amsterdam");
