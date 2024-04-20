const getWeatherInfo = async (location) => {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=6bbd995eb9474538a56122220241704&q=${location}`,
      { mode: "cors" }
    );
    const data = await response.json();

    if (data.error) {
      return { error: data.error.message };
    }

    const weatherInfo = {
      location: data.location.name,
      region: data.location.region,
      country: data.location.country,
      condition: data.current.condition.text,
      dayStatus: data.current.is_day,
      icon: data.current.condition.icon,
      temperatureCelsius: data.current.temp_c,
      temperatureFahrenheit: data.current.temp_f,
      uvIndex: data.current.uv,
      sunrise: data.forecast.forecastday[0].astro.sunrise,
      windSpeed: data.current.wind_kph,
      precipitation: data.current.precip_mm,
      apparentTemperatureCelsius: data.current.feelslike_c,
      apparentTemperatureFahrenheit: data.current.feelslike_f,
      humidity: data.current.humidity,
      visibility: data.current.vis_km,
      pressure: data.current.pressure_mb,
    };

    return weatherInfo;
  } catch (error) {
    return { error: "An error occurred while fetching the weather data" };
  }
};

export default getWeatherInfo;
