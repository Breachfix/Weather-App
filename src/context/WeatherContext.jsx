// src/context/WeatherContext.js

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [currentWeather, setCurrentWeather] = useState({});
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('metric');
  const [lastSearchedCity, setLastSearchedCity] = useState(null);

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  // Fetch weather based on city
  const fetchWeather = async (city) => {
    setError(null);
    setLastSearchedCity(city);
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          q: city,
          appid: apiKey,
          units: unit,
        },
      });
      setWeatherData(response.data);
      setCurrentWeather(response.data); // Set current weather for sunrise/sunset
    } catch (err) {
      setError("Could not fetch weather data. Please try again.");
    }
  };

  // Fetch forecast data based on city
  const fetchForecast = async (city) => {
    setError(null);
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
        params: {
          q: city,
          appid: apiKey,
          units: unit,
        },
      });
      setForecastData(response.data.list);
    } catch (err) {
      setError("Could not fetch forecast data. Please try again.");
    }
  };

  // Fetch weather based on location coordinates
  const fetchWeatherByLocation = async (lat, lon) => {
    setError(null);
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          lat,
          lon,
          appid: apiKey,
          units: unit,
        },
      });
      setWeatherData(response.data);
      setCurrentWeather(response.data);
    } catch (err) {
      setError("Could not fetch weather data. Please try again.");
    }
  };

  // Toggle unit and refetch data for consistency
  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'metric' ? 'imperial' : 'metric'));
  };

  // Refetch weather and forecast data on unit change, if a city was searched
  useEffect(() => {
    if (lastSearchedCity) {
      fetchWeather(lastSearchedCity);
      fetchForecast(lastSearchedCity);
    }
  }, [unit]);

  // Use geolocation to get weather data based on the user's current location
  useEffect(() => {
    if (!lastSearchedCity && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByLocation(latitude, longitude);
        },
        (error) => setError("Geolocation is not enabled."),
      );
    }
  }, [lastSearchedCity, unit]);

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        forecastData,
        currentWeather,
        fetchWeather,
        fetchForecast,
        toggleUnit,
        unit,
        error,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};