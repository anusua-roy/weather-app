import { fetchCities, fetchWeatherData } from "../api";

global.fetch = jest.fn();

describe("API Functions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches cities correctly", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({
        results: [{ name: "New York", latitude: 40.7, longitude: -74 }],
      }),
    });

    const cities = await fetchCities("New York");
    expect(cities).toEqual([
      { name: "New York", latitude: 40.7, longitude: -74 },
    ]);
  });

  it("handles API failure in fetchCities", async () => {
    fetch.mockRejectedValueOnce(new Error("API Error"));

    const cities = await fetchCities("New York");
    expect(cities).toEqual([]); // Should return an empty array on failure
  });

  it("fetches weather data correctly", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({
        current: { temperature_2m: 25, relative_humidity_2m: 60 },
        daily: {
          temperature_2m_max: [30, 32, 29, 28, 31],
          temperature_2m_min: [18, 20, 19, 17, 21],
          precipitation_sum: [2, 1, 3, 0, 4],
        },
      }),
    });

    const weather = await fetchWeatherData(40.7, -74);
    expect(weather).toHaveProperty("current.temperature_2m", 25);
    expect(weather.current.relative_humidity_2m).toBe(60);
    expect(weather.daily.temperature_2m_max.length).toBe(5);
  });

  it("handles API failure in fetchWeatherData", async () => {
    fetch.mockRejectedValueOnce(new Error("API Error"));

    const weather = await fetchWeatherData(40.7, -74);
    expect(weather).toEqual({}); // Ensure it doesn't return null
  });
});
