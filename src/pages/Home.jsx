// src/pages/Home.jsx
import React, { useContext, useEffect, lazy, Suspense } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import SearchBar from '../components/SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureHigh, faTint, faWind } from '@fortawesome/free-solid-svg-icons';
import '../assets/styles/Home.css';

const Forecast = lazy(() => import('../components/Forecast'));

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
          <p className="weather-detail">
            <FontAwesomeIcon icon={faTemperatureHigh} className="icon" />
            Temperature: {weatherData.main.temp}°{unit === 'metric' ? 'C' : 'F'}
          </p>
          <p className="weather-detail">
            <FontAwesomeIcon icon={faTint} className="icon" />
            Humidity: {weatherData.main.humidity}%
          </p>
          <p className="weather-detail">
            <FontAwesomeIcon icon={faWind} className="icon" />
            Wind Speed: {weatherData.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}
          </p>
        </div>
      )}
      {forecastData && (
        <Suspense fallback={<div>Loading forecast...</div>}>
          <Forecast />
        </Suspense>
      )}
    </div>
  );
};

export default Home;