import React from "react";
import { render, screen } from "@testing-library/react";
import WeatherCard from "../components/WeatherCard";

const mockWeatherData = {
  current: {
    temperature_2m: 25,
    apparent_temperature: 27,
    relative_humidity_2m: 60,
    wind_speed_10m: 15,
    precipitation: 2,
  },
  daily: {
    time: [
      "2025-03-19",
      "2025-03-20",
      "2025-03-21",
      "2025-03-22",
      "2025-03-23",
    ],
    temperature_2m_max: [30, 32, 29, 28, 31],
    temperature_2m_min: [18, 20, 19, 17, 21],
    precipitation_sum: [2, 1, 3, 0, 4],
  },
};

describe("WeatherCard Component", () => {
  test("renders city name and weather details", () => {
    render(<WeatherCard city="New York" weatherData={mockWeatherData} />);

    // Check city name
    expect(screen.getByText("New York")).toBeInTheDocument();

    // Check current temperature
    expect(screen.getByText(/25°C/)).toBeInTheDocument();

    // Check "Feels like" using function matcher
    expect(
      screen.getByText((content) => content.includes("Feels like"))
    ).toBeInTheDocument();

    // Check humidity, wind speed, precipitation
    expect(screen.getByText(/Humidity: 60%/)).toBeInTheDocument();
    expect(screen.getByText(/Wind: 15 km\/h/)).toBeInTheDocument();
    expect(screen.getByText(/Precipitation: 2 mm/)).toBeInTheDocument();

    // Check 5-Day Forecast
    expect(screen.getByText(/5-Day Forecast/)).toBeInTheDocument();
    expect(screen.getByText(/2025-03-19/)).toBeInTheDocument();
    expect(screen.getByText(/High: 30°C/)).toBeInTheDocument();
    expect(screen.getByText(/Min: 18°C/)).toBeInTheDocument();
  });
});