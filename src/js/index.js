import "../scss/style.scss";
import { Modal } from "bootstrap";
import getWeatherInfo from "./weather";
import { toggleSearchIcon, renderErrorInfo, renderWeatherInfo } from "./ui";

const weatherForm = document.querySelector(".weather-form");
const searchBtn = document.querySelector(".search-btn");
const searchModal = document.querySelector("#search-modal");
const searchLabel = document.querySelector(".search-label");
const modal = new Modal(searchModal);

const renderInfo = async (location, target) => {
  toggleSearchIcon(target);
  const weatherInfo = await getWeatherInfo(location);
  toggleSearchIcon(target);

  if (weatherInfo.error) {
    renderErrorInfo(weatherInfo.error);
  } else {
    renderWeatherInfo(weatherInfo);
  }
};

const handleFormSubmit = async (e) => {
  e.preventDefault();

  const location = e.target.location.value;
  await renderInfo(location, searchLabel);
  modal.hide();
  e.target.reset();
};

weatherForm.addEventListener("submit", handleFormSubmit);

(async () => {
  await renderInfo("auto:ip", searchBtn);
})();
