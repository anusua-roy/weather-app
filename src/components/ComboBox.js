import React, { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import "../styles.css"; // Import global styles

const ComboBox = ({ onSelect }) => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCities = async (query) => {
    if (!query) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=10&language=en&format=json`
      );
      const data = await response.json();
      setCities(data.results || []);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
    setLoading(false);
  };

  return (
    <Autocomplete
      options={cities}
      getOptionLabel={(option) => option.name}
      onInputChange={(_, value) => fetchCities(value)}
      onChange={(_, value) => onSelect(value)}
      loading={loading}
      className="search-box"
      renderInput={(params) => (
        <TextField {...params} label="Search City" variant="outlined" />
      )}
    />
  );
};

export default ComboBox;
