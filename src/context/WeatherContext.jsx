// src/context/WeatherContext.jsx
import React, { createContext, useState } from 'react';
import axios from 'axios';

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);

  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);

  const [unit, setUnit] = useState('metric'); 

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
  const fetchForecast = async (city) => {
    setError(null);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast`, {
          params: {
            q: city,
            appid: import.meta.env.VITE_WEATHER_API_KEY,
            units: unit,
          },
      });
      setForecastData(response.data.list);
    } catch (err) {
      setError("Could not fetch forecast data. Please try again.");
    }
  };

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'metric' ? 'imperial' : 'metric'));
    setWeatherData(null); // Clear current data to refresh in new units
    setForecastData(null);
  };


  return (
    <WeatherContext.Provider value={{  weatherData, forecastData, fetchWeather, fetchForecast, toggleUnit, unit, error }}>
      {children}
    </WeatherContext.Provider>
  );
};