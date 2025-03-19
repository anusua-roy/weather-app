import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ComboBox from "../components/ComboBox";
import React from "react";

const mockCities = [
  { name: "New York", latitude: 40.7128, longitude: -74.006 },
  { name: "Los Angeles", latitude: 34.0522, longitude: -118.2437 },
];

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ results: mockCities }),
    })
  );
});

test("renders search input", () => {
  render(<ComboBox onSelect={() => {}} />);
  expect(screen.getByLabelText("Search City")).toBeInTheDocument();
});

test("calls setSelectedCity when selecting a city", async () => {
  const mockSelect = jest.fn();
  render(<ComboBox onSelect={mockSelect} />);

  const input = screen.getByLabelText("Search City");
  fireEvent.change(input, { target: { value: "New" } });

  await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
  await waitFor(() => expect(screen.getByText("New York")).toBeInTheDocument());

  fireEvent.click(screen.getByText("New York"));
  expect(mockSelect).toHaveBeenCalledWith(mockCities[0]);
});