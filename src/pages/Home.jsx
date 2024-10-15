// src/pages/Home.jsx
import React, { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import SearchBar from '../components/SearchBar';
import '../assets/styles/Home.css';

const Home = () => {
  const { weatherData, error } = useContext(WeatherContext);

  return (
    <div className="home">
      <SearchBar />
      {error && <p className="error">{error}</p>}
      {weatherData ? (
        <div className="weather-display">
          <h3>Current Weather in {weatherData.name}</h3>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      ) : (
        <p className="no-data">Please search for a city to view weather data.</p>
      )}
    </div>
  );
};

export default Home;