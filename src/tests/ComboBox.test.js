import React from "react"; // ✅ Add this line
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ComboBox from "../components/ComboBox";

describe.skip("ComboBox Component", () => {
  it("fetches and displays city search results", async () => {
    const mockSetSelectedCity = jest.fn();

    render(<ComboBox onSelect={mockSetSelectedCity} />);

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "New York" },
    });

    await waitFor(() => {
      expect(screen.getByText(/New York/i)).toBeInTheDocument();
    });
  });

  it("shows 'No results found' when API returns empty data", async () => {
    const mockSetSelectedCity = jest.fn();

    render(<ComboBox onSelect={mockSetSelectedCity} />);

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "Unknown City" },
    });

    await waitFor(() => {
      expect(screen.getByText(/No results found/i)).toBeInTheDocument();
    });
  });

  it("handles API errors gracefully", async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error("API Error")));

    const mockSetSelectedCity = jest.fn();
    render(<ComboBox onSelect={mockSetSelectedCity} />);

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "New York" },
    });

    await waitFor(() => {
      expect(screen.getByText(/Error fetching cities/i)).toBeInTheDocument();
    });
  });
});
