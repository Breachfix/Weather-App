import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import '../assets/styles/Navbar.css';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [isHidden, setIsHidden] = useState(false);
  let lastScrollY = window.scrollY;

  useEffect(() => {
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode((prevMode) => !prevMode);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
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
          <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;