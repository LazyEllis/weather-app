import getWeatherInfo from "./weather";
import renderWeatherInfo from "./ui";

const weatherForm = document.querySelector(".weather-form");

weatherForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const location = e.target.location.value;
  const weatherInfo = await getWeatherInfo(location);

  renderWeatherInfo(weatherInfo);
  e.target.reset();
});
