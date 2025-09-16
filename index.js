const temp = document.getElementById("temp");
const search = document.getElementById("search");
const submit = document.getElementById("submit");
const weatherDiscripton = document.getElementById("weatherDiscripton");
const feels = document.getElementById("feels");
const prescipitaion = document.getElementById("prescipitaion");
const visibility = document.getElementById("visibility");
const humidity = document.getElementById("humidity");

async function fetchWeatherData(city) {
  const API_URL = `https://api.weatherstack.com/current?access_key=b64d0e900c75c6deb97729e5fb8152a7&query=${
    encodeURIComponent(city) ? encodeURIComponent(city) : "Mumbai"
  }`;
  const options = {
    method: "GET",
  };
  try {
    const response = await fetch(API_URL, options);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    let data = await response.json();

    const current = data.current;

    temp.innerText = current.temperature;
    weatherDiscripton.innerText = current.weather_descriptions[0];
    feels.innerText = current.feelslike;
    prescipitaion.innerText = current.precip;
    visibility.innerText = current.visibility;
    humidity.innerText = current.humidity;
    // console.log("Current" + current);
    // console.log("description" + current.weather_descriptions[0]);
    // console.log("feels" + current.feelslike);
    // console.log("precips" + current.precip);
    // console.log("visibility" + current.visibility);
    // console.log("humidity" + current.humidity);

    return data;
  } catch (error) {
    console.log(error);
  }
}

submit.addEventListener("click", (e) => {
  e.preventDefault();
  const city = search.value.trim();
  city ? fetchWeatherData(city) : "Enter Valid City Name";
});
