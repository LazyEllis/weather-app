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

    return {
      location: data.location.name,
      region: data.location.region,
      country: data.location.country,
      isDay: data.current.is_day,
      icon: data.current.condition.icon,
      temperature: data.current.temp_c,
      condition: data.current.condition.text,
      uvIndex: data.current.uv,
      sunrise: data.forecast.forecastday[0].astro.sunrise,
      windSpeed: data.current.wind_kph,
      precipitation: data.current.precip_mm,
      apparentTemperature: data.current.feelslike_c,
      humidity: data.current.humidity,
      visibility: data.current.vis_km,
      pressure: data.current.pressure_mb,
    };
  } catch (error) {
    return { error: "An error occurred while fetching the weather data" };
  }
};

export default getWeatherInfo;
