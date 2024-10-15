// src/context/WeatherContext.jsx
import React, { createContext, useState } from 'react';
import axios from 'axios';

export const WeatherContext = createContext();

const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async (location) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: { q: location, appid: 'YOUR_API_KEY' }
      });
      setWeatherData(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch weather data.");
    }
  };

  return (
    <WeatherContext.Provider value={{ weatherData, fetchWeather, error }}>
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;