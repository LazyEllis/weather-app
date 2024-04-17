const main = document.querySelector(".main");

const clearWeatherInfo = () => {
  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }
};

const renderWeatherInfo = (weatherInfo) => {
  clearWeatherInfo();

  const heading = document.createElement("h2");
  const condition = document.createElement("p");
  const icon = document.createElement("img");
  const temperature = document.createElement("p");
  const apparentTemperature = document.createElement("p");
  const windSpeed = document.createElement("p");
  const uvIndex = document.createElement("p");
  const precipitation = document.createElement("p");
  const humidity = document.createElement("p");
  const visibility = document.createElement("p");
  const pressure = document.createElement("p");

  heading.textContent = `${weatherInfo.location}, ${weatherInfo.region}, ${weatherInfo.country}`;
  condition.textContent = weatherInfo.condition;
  icon.src = weatherInfo.icon;
  temperature.textContent = `Temperature: ${weatherInfo.temperatureCelsius}°C`;
  apparentTemperature.textContent = `Apparent Temperature: ${weatherInfo.apparentTemperatureCelsius}°C`;
  windSpeed.textContent = `Wind Speed: ${weatherInfo.windSpeed} km/h`;
  uvIndex.textContent = `UV Index: ${weatherInfo.uvIndex}`;
  precipitation.textContent = `Precipitation: ${weatherInfo.precipitation} mm`;
  humidity.textContent = `Humidity: ${weatherInfo.humidity}%`;
  visibility.textContent = `Visibility: ${weatherInfo.visibility} km`;
  pressure.textContent = `Pressure: ${weatherInfo.pressure} mb`;

  main.append(
    heading,
    condition,
    icon,
    temperature,
    apparentTemperature,
    windSpeed,
    uvIndex,
    precipitation,
    humidity,
    visibility,
    pressure
  );
};

export default renderWeatherInfo;
