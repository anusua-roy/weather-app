export const mockCitiesResponse = {
  results: [
    { name: "New York", latitude: 40.7128, longitude: -74.006 },
    { name: "Los Angeles", latitude: 34.0522, longitude: -118.2437 },
  ],
};

export const mockWeatherResponse = {
  current: {
    temperature_2m: 25,
    apparent_temperature: 27,
    relative_humidity_2m: 60,
    precipitation: 2,
    wind_speed_10m: 15,
  },
  daily: {
    temperature_2m_max: [30, 32, 29, 28, 31],
    temperature_2m_min: [18, 20, 19, 17, 21],
    precipitation_sum: [2, 1, 3, 0, 4],
    time: [
      "2025-03-19",
      "2025-03-20",
      "2025-03-21",
      "2025-03-22",
      "2025-03-23",
    ],
  },
};
