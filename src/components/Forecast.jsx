// src/components/Forecast.jsx
import React, { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import '../assets/styles/Forecast.css';

const Forecast = () => {
  const { forecastData, unit } = useContext(WeatherContext);

  // Filter to get one forecast per day (e.g., 12:00 PM)
  const dailyForecast = forecastData.filter(item => item.dt_txt.includes("12:00:00"));

  return (
    <div className="forecast">
      <h3>5-Day Forecast</h3>
      <div className="forecast-container">
        {dailyForecast.map((day, index) => (
          <div key={index} className="forecast-day">
            <p>{new Date(day.dt_txt).toLocaleDateString()}</p>
            <p>Temp: {day.main.temp}°{unit === 'metric' ? 'C' : 'F'}</p>
            <p>Humidity: {day.main.humidity}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;