import { render, screen } from "@testing-library/react";
import WeatherCard from "../components/WeatherCard";
import React from "react";

const mockCity = "New York";
const mockWeatherData = {
  current: {
    temperature_2m: 25,
    apparent_temperature: 27,
    relative_humidity_2m: 60,
    wind_speed_10m: 15,
    precipitation: 2,
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

test("renders city name and weather details", () => {
  render(<WeatherCard city={mockCity} weatherData={mockWeatherData} />);

  expect(screen.getByText("New York")).toBeInTheDocument();
  expect(screen.getByText("Temperature: 25°C")).toBeInTheDocument();
  expect(screen.getByText("Feels like:")).toBeInTheDocument();
  expect(screen.getByText("Humidity: 60%")).toBeInTheDocument();
  expect(screen.getByText("Wind: 15 km/h")).toBeInTheDocument();
  expect(screen.getByText("Precipitation: 2 mm")).toBeInTheDocument();

  // expect(screen.getByText("30")).toBeInTheDocument();
  // expect(screen.getByText("18")).toBeInTheDocument();
  expect(screen.getByText("🌧️ 2 mm")).toBeInTheDocument();
});
