// src/utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  params: {
    appid: 'YOUR_API_KEY',
    units: 'metric' // or 'imperial' for Fahrenheit
  }
});

export const getWeatherByCity = (city) => api.get('/weather', { params: { q: city } });
export const getForecastByCity = (city) => api.get('/forecast', { params: { q: city } });

export default api;