// src/context/WeatherContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('metric'); // "metric" for Celsius, "imperial" for Fahrenheit
  const [lastSearchedCity, setLastSearchedCity] = useState(null);

  const fetchWeather = async (city) => {
    setError(null);
    setLastSearchedCity(city);
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          q: city,
          appid: import.meta.env.VITE_WEATHER_API_KEY,
          units: unit,
        },
      });
      setWeatherData(response.data);
    } catch (err) {
      setError("Could not fetch weather data. Please try again.");
    }
  };

  const fetchForecast = async (city) => {
    setError(null);
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
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
  const fetchWeatherByLocation = async (lat, lon) => {
    setError(null);
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          lat,
          lon,
          appid: import.meta.env.VITE_WEATHER_API_KEY,
          units: unit,
        },
      });
      setWeatherData(response.data);
    } catch (err) {
      setError("Could not fetch weather data. Please try again.");
    }
  };
  
  // Fetch location-based weather if no search is done
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

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'metric' ? 'imperial' : 'metric'));
  };

  // Refetch weather and forecast when unit changes and there is a last searched city
  useEffect(() => {
    if (lastSearchedCity) {
      fetchWeather(lastSearchedCity);
      fetchForecast(lastSearchedCity);
    }
  }, [unit]);

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        forecastData,
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