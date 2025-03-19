import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import "../styles.css"; // Import global styles

const WeatherCard = ({ city, weatherData }) => {
  if (!weatherData || !weatherData.current || !weatherData.daily) {
    return (
      <Typography className="error-text">No weather data available</Typography>
    );
  }

  const { current, daily } = weatherData;

  return (
    <Paper elevation={4} className="weather-card">
      <Typography variant="h4" className="city-name">
        {city}
      </Typography>
      <Typography variant="h2" className="temperature">
        {current.temperature_2m}°C
      </Typography>
      <Typography variant="h6" className="feels-like">
        Feels like {current.apparent_temperature}°C
      </Typography>

      <Grid container spacing={2} className="weather-info">
        <Grid item xs={6} sm={4}>
          <Box className="info-box">
            <Typography>🌡️ High: {daily.temperature_2m_max[0]}°C</Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Box className="info-box">
            <Typography>🌡️ Low: {daily.temperature_2m_min[0]}°C</Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Box className="info-box">
            <Typography>
              💧 Humidity: {current.relative_humidity_2m}%
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Box className="info-box">
            <Typography>💨 Wind: {current.wind_speed_10m} km/h</Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Box className="info-box">
            <Typography>
              🌧️ Precipitation: {current.precipitation} mm
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Typography variant="h6" className="forecast-title">
        5-Day Forecast
      </Typography>
      <div className="forecast-container">
        {daily.time.map((date, index) => (
          <Box key={index} className="forecast-box">
            <Typography variant="body2">{date}</Typography>
            <Typography variant="body1">
              🌡️ {daily.temperature_2m_max[index]}°C
            </Typography>
            <Typography variant="body2">
              Min: {daily.temperature_2m_min[index]}°C
            </Typography>
            <Typography variant="body2">
              🌧️ {daily.precipitation_sum[index]} mm
            </Typography>
          </Box>
        ))}
      </div>
    </Paper>
  );
};

export default WeatherCard;
