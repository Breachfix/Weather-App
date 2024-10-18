import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faCloud, faCloudRain, faSnowflake } from '@fortawesome/free-solid-svg-icons';
import '../assets/styles/Navbar.css';

const Navbar = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'theme-default');
  const [isHidden, setIsHidden] = useState(false);
  let lastScrollY = window.scrollY;

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const themes = ['theme-light', 'theme-dark', 'theme-sunny', 'theme-cloudy', 'theme-rainy', 'theme-snowy'];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length]; // Cycle through themes
    setTheme(nextTheme);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsHidden(true); // Hide navbar when scrolling down
      } else {
        setIsHidden(false); // Show navbar when scrolling up
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${isHidden ? 'hidden' : ''}`}>
      <div className="navbar-logo">
        <img src="/images/logo.png" alt="WeatherApp Logo" className="logo-image" />
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">Weather</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/contact" className="footer-link desktop-only">Contact</Link>
        <Link to="/privacy-policy" className="footer-link desktop-only">Privacy Policy</Link>
        <Link to="/terms-of-service" className="footer-link desktop-only">Terms of Service</Link>
      </div>
      <div className="theme-toggle-container">
        <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
          <FontAwesomeIcon 
            icon={
              theme === 'theme-sunny' ? faSun :
              theme === 'theme-cloudy' ? faCloud :
              theme === 'theme-rainy' ? faCloudRain :
              theme === 'theme-snowy' ? faSnowflake :
              theme === 'theme-dark' ? faMoon : faSun
            } 
          />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;