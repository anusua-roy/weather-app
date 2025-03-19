import React from "react";
import { render, screen } from "@testing-library/react";
import TempCard from "../components/TempCard";

test("renders city name and weather details", () => {
  const mockCity = { label: "New York", latitude: 40.7128, longitude: -74.006 };
  const mockWeatherData = {
    current: { temperature_2m: 25, relative_humidity_2m: 60 },
  };

  render(<TempCard city={mockCity} weatherData={mockWeatherData} />);

  expect(screen.getByText("New York")).toBeInTheDocument();
  expect(screen.getByText("Temperature: 25°C")).toBeInTheDocument();
});