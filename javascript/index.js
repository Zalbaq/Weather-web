import { iconWeather } from "./icon.js";

const apiKey = "d0b9a892411cffcf8d604e5fb4f7a332";
const url = {
  current: "http://api.openweathermap.org/data/2.5/weather?",
  forecast: "http://api.openweathermap.org/data/2.5/forecast?",
};


async function main() {
  const data = await fetchDataWeather("bali");
  console.log(data);
}
main();
