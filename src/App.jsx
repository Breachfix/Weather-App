// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WeatherProvider } from './context/WeatherContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import './assets/styles/App.css';

const App = () => {
  // Initialize theme state based on localStorage, default to light mode
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    // Apply theme class to body and save preference to localStorage
    document.body.className = isDarkMode ? 'dark' : 'light';
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Toggle theme state
  const toggleTheme = () => setIsDarkMode((prevMode) => !prevMode);

  return (
    <WeatherProvider>
      <Router>
        <Navbar />
        <div className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </WeatherProvider>
  );
};

export default App;