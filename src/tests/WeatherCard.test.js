import React from "react"; // ✅ Add this line
import { render, screen } from "@testing-library/react";
import WeatherCard from "../components/WeatherCard";

const mockWeatherData = {
  current: {
    temperature_2m: 25,
    relative_humidity_2m: 60,
    apparent_temperature: 27,
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
      "2025-03-24",
      "2025-03-25",
    ],
    temperature_2m_max: [30, 32, 29, 28, 31],
    temperature_2m_min: [18, 20, 19, 17, 21],
    precipitation_sum: [2, 1, 3, 0, 4],
  },
};

describe("WeatherCard Component", () => {
  it("renders all weather details correctly", () => {
    render(<WeatherCard city="New York" weatherData={mockWeatherData} />);

    expect(screen.getByText("New York")).toBeInTheDocument();
    expect(screen.getByText(/25°C/)).toBeInTheDocument();
    expect(screen.getByText(/Feels like 27°C/)).toBeInTheDocument();
    expect(screen.getByText(/Humidity: 60%/)).toBeInTheDocument();
    expect(screen.getByText(/Wind: 15/)).toBeInTheDocument();
    expect(screen.getByText(/Precipitation: 2 mm/)).toBeInTheDocument();
  });
});
