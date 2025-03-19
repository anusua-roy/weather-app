import React, { useState, useEffect } from "react";
import { Container, Typography, CircularProgress } from "@mui/material";
import ComboBox from "./components/ComboBox";
import WeatherCard from "./components/WeatherCard";
import { fetchWeatherData } from "./api";

const App = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedCity) {
      setLoading(true);
      fetchWeatherData(selectedCity.latitude, selectedCity.longitude)
        .then((data) => {
          setWeatherData(data);
          setLoading(false);
        })
        .catch(() => {
          setWeatherData(null);
          setLoading(false);
        });
    }
  }, [selectedCity]);

  return (
    <div className="app-container">
      <Container maxWidth="md" className="content">
        <Typography variant="h3" className="title">
          🌤 Weather App
        </Typography>
        <ComboBox onSelect={setSelectedCity} />
        {loading && <CircularProgress color="primary" className="loading" />}
        {selectedCity && weatherData && (
          <WeatherCard city={selectedCity.name} weatherData={weatherData} />
        )}
      </Container>
    </div>
  );
};

export default App;
