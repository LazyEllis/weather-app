import "../scss/style.scss";
import { Modal } from "bootstrap";
import getWeatherInfo from "./weather";
import { toggleSearchIcon, renderErrorInfo, renderWeatherInfo } from "./ui";

const weatherForm = document.querySelector(".weather-form");
const searchBtn = document.querySelector(".search-btn");
const searchModal = document.querySelector("#search-modal");
const searchLabel = document.querySelector(".search-label");
const modal = new Modal(searchModal);

const renderDefaultWeatherInfo = async () => {
  const weatherInfo = await getWeatherInfo("London");
  toggleSearchIcon(searchBtn);
  if (weatherInfo.error) {
    renderErrorInfo(weatherInfo.error);
  } else {
    renderWeatherInfo(weatherInfo);
  }
};

weatherForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  toggleSearchIcon(searchLabel);
  const location = e.target.location.value;
  const weatherInfo = await getWeatherInfo(location);

  toggleSearchIcon(searchLabel);
  if (weatherInfo.error) {
    renderErrorInfo(weatherInfo.error);
  } else {
    renderWeatherInfo(weatherInfo);
  }
  modal.hide();
  e.target.reset();
});

renderDefaultWeatherInfo();
