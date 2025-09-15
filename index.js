const temp = document.getElementById("temp");

const API_URL =
  "https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=19.03&lon=73.02";

async function fetchWeatherData() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    let data = await response.json();

    const timeseries = data.properties.timeseries;

    const current = extractInstant(timeseries[0]);
    temp.innerText = current.temp;
    console.log(current);
    console.log(timeseries[0]);
    return data;
  } catch (error) {
    console.log(error);
  }
}

function extractInstant(entry) {
  const {
    air_temperature,
    wind_from_direction,
    wind_speed,
    relative_humidity,
  } = entry.data.instant.details;
  return {
    temp: air_temperature,
    time: entry.time,
    humidity: relative_humidity,
    wind_direction: wind_from_direction,
    wind_speed: wind_speed,
  };
}

fetchWeatherData();
