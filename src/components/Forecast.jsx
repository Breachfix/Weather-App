import React, { useContext, useEffect } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTint, faSun, faMoon, faCalendarAlt, faThermometerHalf, faCloudRain } from '@fortawesome/free-solid-svg-icons';
import '../assets/styles/Forecast.css';

const Forecast = () => {
  const { forecastData, currentWeather, unit } = useContext(WeatherContext);

  useEffect(() => {
    const forecastCards = document.querySelectorAll('.forecast-day');
    forecastCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('show');
      }, index * 100);
    });
  }, [forecastData]);

  // Function to get the name of the day (e.g., Monday, Tuesday)
  const getDayName = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  // Extract sunrise and sunset from current weather data
  const sunrise = currentWeather?.sys?.sunrise ? new Date(currentWeather.sys.sunrise * 1000).toLocaleTimeString() : 'N/A';
  const sunset = currentWeather?.sys?.sunset ? new Date(currentWeather.sys.sunset * 1000).toLocaleTimeString() : 'N/A';

  // Process the daily forecast data
  const dailyForecast = forecastData
    .filter(item => item.dt_txt.includes("12:00:00"))
    .map(day => ({
      ...day,
      rainVolume: day.rain?.["3h"] ? day.rain["3h"] : 0
    }));

  return (
    <div className="forecast">
      <h3>Next 5-Day Forecast</h3>
      <div className="forecast-container">
        {dailyForecast.map((day, index) => (
          <div key={index} className="forecast-day">
            {/* Display the day of the week with an icon */}
            <div className="forecast-date">
              <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
              <h4>{getDayName(day.dt_txt)}</h4> {/* Here is where the day name is displayed */}
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
                Sunrise: {sunrise}
              </p>
              <p>
                <FontAwesomeIcon icon={faMoon} className="icon" />
                Sunset: {sunset}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;