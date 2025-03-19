import { useEffect, useState, useCallback } from "react";
import ComboBox from "./components/ComboBox";
import TempCard from "./components/TempCard";
import { debounce } from "lodash";

function App() {
  const [city, setCity] = useState("");
  const [searchedCities, setSearchedCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (city.length > 0) {
      fetchCityData();
    }
  }, [city]);

  useEffect(() => {
    if (selectedCity) {
      fetchWeatherData();
    }
  }, [selectedCity]);

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const fetchCityData = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.results) {
        const cities = data.results.slice(0, 5).map((item) => ({
          label: item.name,
          latitude: item.latitude,
          longitude: item.longitude,
        }));
        setSearchedCities(cities);
      } else {
        setSearchedCities([]);
      }
    } catch (error) {
      setError("Failed to fetch city data");
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);
    try {
      const { latitude, longitude } = selectedCity;
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`;

      const response = await fetch(url);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      setError("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <ComboBox
        cities={searchedCities}
        setSelectedCity={setSelectedCity}
        handleChange={handleChange}
      />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {selectedCity && (
        <TempCard city={selectedCity} weatherData={weatherData} />
      )}
    </div>
  );
}

export default App;