// src/components/SearchBar.jsx
import React, { useState, useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import '../assets/styles/SearchBar.css';

const SearchBar = () => {
  const [city, setCity] = useState('');
  const { fetchWeather } = useContext(WeatherContext);

  const handleSearch = () => {
    if (city.trim()) {
      fetchWeather(city);
      setCity(''); // Clear input after search
    }
  };

  return (
    <div className="search-bar">
      <div className="input-container">
        <FontAwesomeIcon icon={faSearch} className="input-icon" />
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="search-input"
        />
      </div>
      <button onClick={handleSearch} className="search-button">
        Search
      </button>
    </div>
  );
};

export default SearchBar;