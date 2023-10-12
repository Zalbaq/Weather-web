import { iconWeather } from "./icon.js";

const apiKey = "d0b9a892411cffcf8d604e5fb4f7a332";
const url = {
  current: "https://api.openweathermap.org/data/2.5/weather?",
  forecast: "https://api.openweathermap.org/data/2.5/forecast?",
};

const fetchDataWeather = async (location) => {
  const weatherIcon = document.querySelector("#weather-icon > img");
  const temp = document.querySelector("#temp");
  const locationH2 = document.querySelector("#location");
  const humidity = document.querySelector("#humidity > label");
  const windSpeed = document.querySelector("#wind-speed > label");
  const sunrise = document.querySelector("#sunrise > label");
  const sunset = document.querySelector("#sunset > label");
  const res = {
    current: await fetch(url.current + `q=${location}` + `&appid=${apiKey}`),
    forecast: await fetch(url.forecast + `q=${location}` + `&appid=${apiKey}`),
  };
  const data = {
    current: await res.current.json(),
    forecast: await res.forecast.json(),
  };

  const idCurrent = data.current.weather[0].id;
  const timestampSunrise = data.current.sys.sunrise;
  const timestampSunset = data.current.sys.sunset;

  const realTimeSunrise = new Date(timestampSunrise * 1000);
  const realTimeSunset = new Date(timestampSunset * 1000);

  if (idCurrent >= 801) {
    weatherIcon.src = iconWeather.cloudy;
  } else if (idCurrent === 800) {
    weatherIcon.src = iconWeather.shiny;
  } else if (idCurrent >= 700) {
    weatherIcon.src = iconWeather.mist;
  } else if (idCurrent >= 600) {
    weatherIcon.src = iconWeather.snowy;
  } else if (idCurrent >= 500) {
    weatherIcon.src = iconWeather.rainy;
  } else if (idCurrent >= 300) {
    weatherIcon.src = iconWeather.drizzle;
  } else if (idCurrent >= 200) {
    weatherIcon.src = iconWeather.thunder;
  }

  temp.textContent = `${(data.current.main.temp - 273.15).toFixed(2)}°`;
  locationH2.textContent = `${capitalizeWords(location)}`;
  humidity.textContent = `${data.current.main.humidity}%`;
  windSpeed.textContent = `${data.current.wind.speed} Km/h`;
  sunrise.textContent = `${realTimeSunrise.getHours()} : ${realTimeSunrise.getMinutes()} : ${realTimeSunrise.getSeconds()}`;
  sunset.textContent = `${realTimeSunset.getHours()} : ${realTimeSunrise.getMinutes()} : ${realTimeSunrise.getSeconds()}`;
};

async function main() {
  const data = await fetchDataWeather("Nganjuk");
  console.log(data);
}

const capitalizeWords = (text) => {
  return text
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};

const searchWeatherLocation = async () => {
  const search = document.querySelector("#search-icon");
  const location = document.querySelector("#search-location");

  search.addEventListener("click", () => {
    fetchDataWeather(location.value);
    location.value = "";
  });
  location.addEventListener("keypress", (e) => {
    if (e.keyCode == 13) {
      fetchDataWeather(location.value);
      location.value = "";
    }
  });
};

searchWeatherLocation();
