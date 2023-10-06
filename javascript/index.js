import { iconWeather } from "./icon.js";
const apiKey = "c2ded802f4654979a7e00013230510";
const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${country}&aqi=no`;

const fetchDataCurrent = async (country) => {
  const res = await fetch(url);
  const { current } = await res.json();
  const data = current;
  return {
    humidity: current.humidity,
    "wind speed": current.wind_kph,
    'chance of rain': current
  };
};



