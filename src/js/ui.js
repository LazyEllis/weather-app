const body = document.querySelector("body");
const container = document.querySelector(".container");
const spinner = document.querySelector(".spinner-border");

const switchClass = (element, initialClass, finalClass) => {
  if (element.classList.contains(initialClass)) {
    element.classList.remove(initialClass);
  }

  element.classList.add(finalClass);
};
const clearWeatherInfo = () => {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
};

const createRow = () => {
  const row = document.createElement("div");
  row.classList.add("row", "row-cols-1", "row-cols-xs-2", "g-3");
  return row;
};

const setTheme = (isDay) => {
  if (isDay) {
    switchClass(body, "night-theme", "day-theme");
  } else {
    switchClass(body, "day-theme", "night-theme");
  }
};

const createCardTitle = (title) => {
  const cardTitle = document.createElement("div");
  const cardIcon = document.createElement("i");

  cardTitle.classList.add("card-title", "fw-medium");

  if (title === "Feels Like") {
    cardIcon.classList.add("bi", "bi-thermometer-sun", "me-2");
  } else if (title === "Wind") {
    cardIcon.classList.add("bi", "bi-wind", "me-2");
  } else if (title === "UV Index") {
    cardIcon.classList.add("bi", "bi-brightness-high", "me-2");
  } else if (title === "Precipitation") {
    cardIcon.classList.add("bi", "bi-droplet-fill", "me-2");
  } else if (title === "Humidity") {
    cardIcon.classList.add("bi", "bi-water", "me-2");
  } else if (title === "Visibility") {
    cardIcon.classList.add("bi", "bi-eye-fill", "me-2");
  } else if (title === "Pressure") {
    cardIcon.classList.add("bi", "bi-speedometer", "me-2");
  } else if (title === "Sunrise") {
    cardIcon.classList.add("bi", "bi-sunrise-fill", "me-2");
  }

  cardTitle.textContent = title;
  cardTitle.prepend(cardIcon);

  return cardTitle;
};

const createCardText = (title, info) => {
  const cardText = document.createElement("div");
  cardText.classList.add("card-text", "fs-1");

  if (title === "Feels Like") {
    cardText.textContent = `${info}°C`;
  } else if (title === "Wind") {
    cardText.textContent = `${info} km/h`;
  } else if (title === "UV Index") {
    cardText.textContent = `${info}`;
  } else if (title === "Precipitation") {
    cardText.textContent = `${info} mm`;
  } else if (title === "Humidity") {
    cardText.textContent = `${info}%`;
  } else if (title === "Visibility") {
    cardText.textContent = `${info} km`;
  } else if (title === "Pressure") {
    cardText.textContent = `${info} mb`;
  } else if (title === "Sunrise") {
    cardText.textContent = `${info.slice(1)}`;
  }

  return cardText;
};

const createHeader = (location, region, country) => {
  const header = document.createElement("div");
  const locationDiv = document.createElement("div");
  const locationIcon = document.createElement("i");

  header.classList.add("pb-3");
  locationIcon.classList.add("bi", "bi-house-door-fill", "me-2");

  locationDiv.textContent = `${location}, ${region}, ${country}`;
  locationDiv.prepend(locationIcon);
  header.append(locationDiv);

  return header;
};

const createHeroCard = (icon, temperature, condition) => {
  const heroCard = document.createElement("div");
  const cardBody = document.createElement("div");
  const cardTitle = document.createElement("div");
  const cardText = document.createElement("div");
  const flexContainer = document.createElement("div");
  const iconImg = document.createElement("img");
  const temperatureDiv = document.createElement("div");
  const conditionDiv = document.createElement("div");

  heroCard.classList.add("card", "mb-3");
  cardBody.classList.add("card-body");
  cardTitle.classList.add("card-title", "fw-medium");
  cardText.classList.add("card-text");
  flexContainer.classList.add("d-flex", "align-items-center");
  temperatureDiv.classList.add("fs-1");
  conditionDiv.classList.add("fs-5", "ps-2");

  cardTitle.textContent = "Current Weather";

  iconImg.src = icon;
  temperatureDiv.textContent = `${temperature}°C`;
  conditionDiv.textContent = condition;

  flexContainer.append(iconImg, temperatureDiv);
  cardText.append(flexContainer, conditionDiv);
  cardBody.append(cardTitle, cardText);
  heroCard.append(cardBody);

  return heroCard;
};

const createWeatherInfoCard = (title, info) => {
  const cardContainer = document.createElement("div");
  const card = document.createElement("div");
  const cardBody = document.createElement("div");
  const cardTitle = createCardTitle(title);
  const cardText = createCardText(title, info);

  cardContainer.classList.add("col");
  card.classList.add("card");
  cardBody.classList.add("card-body");

  cardBody.append(cardTitle, cardText);
  card.append(cardBody);
  cardContainer.append(card);

  return cardContainer;
};

export const toggleSearchIcon = (searchBox) => {
  const searchIcon = document.createElement("i");
  const initialIcon = searchBox.firstElementChild;

  searchIcon.classList.add("bi", "bi-search");

  if (searchBox.classList.contains("search-btn"))
    searchIcon.classList.add("me-0", "me-lg-2");

  searchBox.removeChild(initialIcon);

  if (initialIcon.classList.contains("spinner-border")) {
    searchBox.prepend(searchIcon);
  } else {
    searchBox.prepend(spinner.cloneNode());
  }
};

export const renderErrorInfo = (error) => {
  clearWeatherInfo();
  const errorContainer = document.createElement("div");
  const errorIcon = document.createElement("i");
  const errorText = document.createElement("div");

  errorContainer.classList.add(
    "d-flex",
    "justify-content-center",
    "align-items-center",
    "h-100"
  );
  errorIcon.classList.add("bi", "bi-exclamation-triangle", "fs-1", "me-2");
  errorText.classList.add("fs-3");

  errorText.textContent = error;

  errorContainer.append(errorIcon, errorText);
  container.append(errorContainer);
};

export const renderWeatherInfo = (weatherInfo) => {
  clearWeatherInfo();

  setTheme(weatherInfo.isDay);
  const header = createHeader(
    weatherInfo.location,
    weatherInfo.region,
    weatherInfo.country
  );
  const heroCard = createHeroCard(
    weatherInfo.icon,
    weatherInfo.temperature,
    weatherInfo.condition
  );
  const row = createRow();
  const uvIndexCard = createWeatherInfoCard("UV Index", weatherInfo.uvIndex);
  const sunriseCard = createWeatherInfoCard("Sunrise", weatherInfo.sunrise);
  const windCard = createWeatherInfoCard("Wind", weatherInfo.windSpeed);
  const precipitationCard = createWeatherInfoCard(
    "Precipitation",
    weatherInfo.precipitation
  );
  const apparentTemperatureCard = createWeatherInfoCard(
    "Feels Like",
    weatherInfo.apparentTemperature
  );
  const humidityCard = createWeatherInfoCard("Humidity", weatherInfo.humidity);
  const visibilityCard = createWeatherInfoCard(
    "Visibility",
    weatherInfo.visibility
  );
  const pressureCard = createWeatherInfoCard("Pressure", weatherInfo.pressure);

  row.append(
    uvIndexCard,
    sunriseCard,
    windCard,
    precipitationCard,
    apparentTemperatureCard,
    humidityCard,
    visibilityCard,
    pressureCard
  );

  container.append(header, heroCard, row);
};
