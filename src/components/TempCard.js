import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AirIcon from "@mui/icons-material/Air";
import GrainIcon from "@mui/icons-material/Grain";

const ForecastContainer = styled("div")(({ theme }) => ({
  display: "flex",
  overflowX: "auto",
  gap: theme.spacing(2),
  padding: theme.spacing(1),
  scrollbarWidth: "thin",
  "&::-webkit-scrollbar": {
    height: "6px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#888",
    borderRadius: "10px",
  },
}));

const getBackgroundGradient = (temperature) => {
  if (temperature >= 30) return "linear-gradient(135deg, #ff7e5f, #feb47b)";
  if (temperature >= 20) return "linear-gradient(135deg, #6dd5ed, #2193b0)";
  return "linear-gradient(135deg, #b3cdd1, #667db6)";
};

const TempCard = ({ city, weatherData }) => {
  if (!city || !weatherData) return <Typography>No data available.</Typography>;

  const { current, daily } = weatherData;
  const backgroundGradient = getBackgroundGradient(current.temperature_2m);

  return (
    <Box
      sx={{
        background: backgroundGradient,
        color: "#fff",
        borderRadius: 4,
        p: 3,
        maxWidth: 500,
        margin: "auto",
        mt: 4,
        boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
      }}
    >
      <Typography variant="h4" textAlign="center" fontWeight="bold">
        {city.label}
      </Typography>
      <Typography variant="h2" textAlign="center">
        {current.temperature_2m}°C
      </Typography>
      <Typography textAlign="center" variant="h6">
        Feels like {current.apparent_temperature}°C
      </Typography>

      <Grid container spacing={2} justifyContent="center" mt={2}>
        <Grid item>
          <Box textAlign="center">
            <WbSunnyIcon fontSize="large" />
            <Typography>High: {daily.temperature_2m_max[0]}°C</Typography>
          </Box>
        </Grid>
        <Grid item>
          <Box textAlign="center">
            <AcUnitIcon fontSize="large" />
            <Typography>Low: {daily.temperature_2m_min[0]}°C</Typography>
          </Box>
        </Grid>
        <Grid item>
          <Box textAlign="center">
            <WaterDropIcon fontSize="large" />
            <Typography>Humidity: {current.relative_humidity_2m}%</Typography>
          </Box>
        </Grid>
        <Grid item>
          <Box textAlign="center">
            <AirIcon fontSize="large" />
            <Typography>Wind: {current.wind_speed_10m} km/h</Typography>
          </Box>
        </Grid>
        <Grid item>
          <Box textAlign="center">
            <GrainIcon fontSize="large" />
            <Typography>Precipitation: {current.precipitation} mm</Typography>
          </Box>
        </Grid>
      </Grid>

      <Typography variant="h6" mt={3} textAlign="center">
        5-Day Forecast
      </Typography>
      <ForecastContainer>
        {daily.temperature_2m_max.map((temp, index) => (
          <Box
            key={index}
            sx={{
              textAlign: "center",
              minWidth: 100,
              p: 2,
              bgcolor: "rgba(255, 255, 255, 0.3)",
              borderRadius: 2,
            }}
          >
            <Typography variant="body2">
              {new Date(daily.time[index]).toLocaleDateString()}
            </Typography>
            <Typography variant="body1">🌡️ {temp}°C</Typography>
            <Typography variant="body2">
              Min: {daily.temperature_2m_min[index]}°C
            </Typography>
            <Typography variant="body2">
              🌧️ {daily.precipitation_sum[index]} mm
            </Typography>
          </Box>
        ))}
      </ForecastContainer>
    </Box>
  );
};

export default TempCard;
