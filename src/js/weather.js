const getWeatherInfo = async (location) => {
  const apiKey = "6bbd995eb9474538a56122220241704";
  const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=1`;

  try {
    const response = await fetch(apiUrl, { mode: "cors" });
    const data = await response.json();

    if (data.error) {
      return { error: data.error.message };
    }

    const { current } = data;
    const forecast = data.forecast.forecastday[0].astro;

    return {
      location: data.location.name,
      region: data.location.region,
      country: data.location.country,
      isDay: current.is_day,
      icon: current.condition.icon,
      temperature: current.temp_c,
      condition: current.condition.text,
      uvIndex: current.uv,
      sunrise: forecast.sunrise,
      windSpeed: current.wind_kph,
      precipitation: current.precip_mm,
      apparentTemperature: current.feelslike_c,
      humidity: current.humidity,
      visibility: current.vis_km,
      pressure: current.pressure_mb,
    };
  } catch (error) {
    return { error: "An error occurred while fetching the weather data" };
  }
};

export default getWeatherInfo;
