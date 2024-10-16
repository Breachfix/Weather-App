// src/components/Forecast.jsx
import React, { useContext, useEffect } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTint, faSun, faMoon, faCalendarAlt, faThermometerHalf, faCloudRain } from '@fortawesome/free-solid-svg-icons';
import '../assets/styles/Forecast.css';

const Forecast = () => {
  const { forecastData, unit } = useContext(WeatherContext);

  useEffect(() => {
    const forecastCards = document.querySelectorAll('.forecast-day');
    forecastCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('show');
      }, index * 100);
    });
  }, [forecastData]);

  const dailyForecast = forecastData
    .filter(item => item.dt_txt.includes("12:00:00"))
    .map(day => {
      const sunrise = day.sys?.sunrise ? new Date(day.sys.sunrise * 1000).toLocaleTimeString() : 'N/A';
      const sunset = day.sys?.sunset ? new Date(day.sys.sunset * 1000).toLocaleTimeString() : 'N/A';
      const rainVolume = day.rain?.["3h"] ? day.rain["3h"] : 0; // Rain volume for the last 3 hours

      return { ...day, sunrise, sunset, rainVolume };
    });

  return (
    <div className="forecast">
      <h3>5-Day Forecast</h3>
      <div className="forecast-container">
        {dailyForecast.map((day, index) => (
          <div key={index} className="forecast-day">
            {/* Date with icon */}
            <div className="forecast-date">
              <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
              <h4>{new Date(day.dt_txt).toLocaleDateString()}</h4>
            </div>

            {/* Weather condition icon */}
            <img 
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} 
              alt="weather icon" 
              className="weather-icon"
            />

            {/* Temperature with icon */}
            <p className="temperature">
              <FontAwesomeIcon icon={faThermometerHalf} className="icon" />
              {day.main.temp}°{unit === 'metric' ? 'C' : 'F'}
            </p>

            {/* Additional details */}
            <div className="details">
              <p>
                <FontAwesomeIcon icon={faTint} className="icon" />
                Humidity: {day.main.humidity}%
              </p>
              <p>
                <FontAwesomeIcon icon={faCloudRain} className="icon" />
                Rain: {day.rainVolume} mm
              </p>
              <p>
                <FontAwesomeIcon icon={faSun} className="icon" />
                Sunrise: {day.sunrise}
              </p>
              <p>
                <FontAwesomeIcon icon={faMoon} className="icon" />
                Sunset: {day.sunset}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;