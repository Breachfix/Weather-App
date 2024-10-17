// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WeatherProvider } from './context/WeatherContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import './assets/styles/App.css';

const App = () => {
  return (
    <WeatherProvider>
      <Router>
        <Navbar /> {/* Navbar now contains theme toggle */}
        <div className="app-background"></div> {/* Add background layer */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </WeatherProvider>
  );
};

export default App;