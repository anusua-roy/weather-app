// src/api.js
export const fetchCities = async (query) => {
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=5&language=en&format=json`
    );

    if (!response.ok) throw new Error("Failed to fetch cities");

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching cities:", error);
    return []; // Always return an empty array instead of undefined
  }
};

export const fetchWeatherData = async (lat, lon) => {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`
    );
    const data = await response.json();

    if (!data || !data.current || !data.daily) {
      throw new Error("Invalid weather data received.");
    }

    return data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null;
  }
};
