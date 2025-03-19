import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ComboBox from "../components/ComboBox";

const mockCities = [
  { label: "New York", latitude: 40.7128, longitude: -74.006 },
  { label: "Los Angeles", latitude: 34.0522, longitude: -118.2437 },
];

describe("ComboBox Component", () => {
  test("renders search bar correctly", () => {
    render(
      <ComboBox
        cities={mockCities}
        setSelectedCity={jest.fn()}
        handleChange={jest.fn()}
        loading={false}
      />
    );
    expect(screen.getByLabelText("Search City")).toBeInTheDocument();
  });

  test("shows autocomplete options when typing", async () => {
    render(
      <ComboBox
        cities={mockCities}
        setSelectedCity={jest.fn()}
        handleChange={jest.fn()}
        loading={false}
      />
    );
    const input = screen.getByLabelText("Search City");
    fireEvent.change(input, { target: { value: "New" } });
    expect(screen.getByText("New York")).toBeInTheDocument();
  });

  test("calls setSelectedCity when selecting a city", () => {
    const mockSetSelectedCity = jest.fn();
    render(
      <ComboBox
        cities={mockCities}
        setSelectedCity={mockSetSelectedCity}
        handleChange={jest.fn()}
        loading={false}
      />
    );

    fireEvent.click(screen.getByText("New York"));
    expect(mockSetSelectedCity).toHaveBeenCalledWith(mockCities[0]);
  });

  test("displays loading indicator when fetching data", () => {
    render(
      <ComboBox
        cities={[]}
        setSelectedCity={jest.fn()}
        handleChange={jest.fn()}
        loading={true}
      />
    );
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("shows 'No results found' when city list is empty", () => {
    render(
      <ComboBox
        cities={[]}
        setSelectedCity={jest.fn()}
        handleChange={jest.fn()}
        loading={false}
      />
    );
    expect(screen.getByText("No results found")).toBeInTheDocument();
  });
});
