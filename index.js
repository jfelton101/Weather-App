// put } after code is finished

let days = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY"
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
  "DEC"
];
let now = new Date();
let currentDate = now.getDate();
let month = months[now.getMonth()];
let day = days[now.getDay()];

//let currentHour = now.getHours();
//let currentMinutes = now.getMinutes();
//let ampm = "AM";
//if (currentHour >= 12) {
//ampm = "PM";

// need to do something to change to 12 hour clock
let date = document.querySelector(".date");
date.innerHTML = `${day}, ${month} ${currentDate}`;

let time12Hr = now.toLocaleString("en-US", {
  hour: "numeric",
  minute: "numeric",
  hour12: true
});
let time = document.querySelector(".time");
time.innerHTML = time12Hr;

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
  temp.innerHTML = temperature;
  h1.innerHTML = response.data.name;
}

function retrieveCity(city) {
  let apiKey = "1a83008090457b4fd7f896351fa948c0";
  let url = `https://api.openweathermap.org/data/2.5/weather?&q=${city}&units=imperial&appid=${apiKey}`;
  axios.get(url).then(currentTemp);
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
