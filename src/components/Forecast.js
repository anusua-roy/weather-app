// src/components/Forecast.js
import React from "react";
import { Box, Typography } from "@mui/material";

const Forecast = ({ daily }) => {
  if (!daily) return null;
  return (
    <Box sx={{ display: "flex", overflowX: "auto", gap: 2 }}>
      {daily.temperature_2m_max.map((maxTemp, index) => (
        <Box key={index} sx={{ padding: 2, border: "1px solid gray", minWidth: 120 }}>
          <Typography>{new Date(daily.time[index]).toLocaleDateString()}</Typography>
          <Typography>🌡️ High: {maxTemp}°C</Typography>
          <Typography>🌡️ Low: {daily.temperature_2m_min[index]}°C</Typography>
          <Typography>🌧️ {daily.precipitation_sum[index]} mm</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default Forecast;