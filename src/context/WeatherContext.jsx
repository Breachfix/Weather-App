// src/context/WeatherContext.jsx
import React, { createContext, useState } from 'react';
import axios from 'axios';

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async (city) => {
    setError(null); // Reset error state
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`
      );
      setWeatherData(response.data);
    } catch (err) {
      setError("Could not fetch weather data. Please try again.");
    }
  };

  return (
    <WeatherContext.Provider value={{ weatherData, fetchWeather, error }}>
      {children}
    </WeatherContext.Provider>
  );
};