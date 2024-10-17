import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
  <div className="footer-links">
    <a href="/about" className="footer-link">About</a>
    <a href="/contact" className="footer-link">Contact</a>
    <a href="/privacy-policy" className="footer-link">Privacy Policy</a>
    <a href="/terms-of-service" className="footer-link">Terms of Service</a>
  </div>
  <p>&copy; {new Date().getFullYear()} WeatherApp. All rights reserved.</p>
</footer>
  );
};

export default Footer;