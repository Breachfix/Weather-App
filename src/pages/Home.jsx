// src/pages/Home.jsx
import React, { useContext, useEffect } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import SearchBar from '../components/SearchBar';
import Forecast from '../components/Forecast';
import '../assets/styles/Home.css';

const Home = () => {
  const { weatherData, forecastData, fetchForecast, toggleUnit, unit, error } = useContext(WeatherContext);

  useEffect(() => {
    if (weatherData) fetchForecast(weatherData.name);
  }, [weatherData, unit]);

  return (
    <div className="home">
      <SearchBar />
      <button onClick={toggleUnit} className="unit-toggle">
        Switch to {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}
      </button>
      {error && <p className="error">{error}</p>}
      {weatherData && (
        <div className="weather-display">
          <h3>Current Weather in {weatherData.name}</h3>
          <p>Temperature: {weatherData.main.temp}°{unit === 'metric' ? 'C' : 'F'}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}</p>
        </div>
      )}
      {forecastData && <Forecast />}
    </div>
  );
};

export default Home;