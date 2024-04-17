import "../scss/style.scss";
import { Modal } from "bootstrap";
import getWeatherInfo from "./weather";
import renderWeatherInfo from "./ui";

const weatherForm = document.querySelector(".weather-form");
const searchModal = document.querySelector("#search-modal");
const modal = new Modal(searchModal);

weatherForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const location = e.target.location.value;
  const weatherInfo = await getWeatherInfo(location);

  renderWeatherInfo(weatherInfo);
  modal.hide();
  e.target.reset();
});
