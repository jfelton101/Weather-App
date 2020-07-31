// put } after code is finished

let days = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];
let months = [
  "JAN",
  "FEB",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUG",
  "SEPT",
  "OCT",
  "NOV",
  "DEC",
];

function formatHours(timestamp) {
  let now = new Date();
  let currentDate = now.getDate();
  let month = months[now.getMonth()];
  let day = days[now.getDay()];

  //let currentHour = now.getHours();
  //let currentMinutes = now.getMinutes();
  //let ampm = "AM";
  //if (currentHour >= 12) {
  //ampm = "PM";

  let date = document.querySelector(".date");
  date.innerHTML = `${day}, ${month} ${currentDate}`;

  let time12Hr = now.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  let time = document.querySelector(".time");
  time.innerHTML = time12Hr;

  return `${time12Hr}`;
}

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city");
  let h1 = document.querySelector("h1");
  if (searchInput.value) {
    h1.innerHTML = searchInput.value;
    retrieveCity(searchInput.value);
  } else {
    h1.innerHTML = null;
    alert("Please type in a city");
  }
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

function currentTemp(response) {
  let h1 = document.querySelector("h1");
  let temp = document.querySelector(".currentTemp");
  let temperature = Math.round(response.data.main.temp);
  let iconElement = document.querySelector("#icon");
  let descriptionElement = document.querySelector("#description");
  let windSpeedElement = document.querySelector("#wind-speed");
  let humidityElement = document.querySelector("#humidity");

  fahrenheitTemperature = response.data.main.temp;
  temp.innerHTML = temperature;
  h1.innerHTML = response.data.name;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  descriptionElement.innerHTML = response.data.weather[0].description;
  windSpeedElement.innerHTML = `Wind Speed: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col d-flex justify-content-center">
      <p class="day-one">
        ${formatHours(forecast.dt * 1000)} <br />
        <img src="https://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png" />
        <br />
        <strong>${Math.round(forecast.main.temp_max)}°F</strong> | ${Math.round(
      forecast.main.temp_min
    )}°F
      </p>
    </div>
  `;
  }
}
function retrieveCity(city) {
  let apiKey = "1a83008090457b4fd7f896351fa948c0";
  let url = `https://api.openweathermap.org/data/2.5/weather?&q=${city}&units=imperial&appid=${apiKey}`;
  axios.get(url).then(currentTemp);

  url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(url).then(displayForecast);
}

function retrievePosition(position) {
  let apiKey = "1a83008090457b4fd7f896351fa948c0";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

  axios.get(url).then(currentTemp);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getPosition);

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let celsiusTemperature = (fahrenheitTemperature - 32) * 0.5556;
  let temperatureElement = document.querySelector(".currentTemp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".currentTemp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitTemperature = null;
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
