// src/services/weatherService.js
import axios from 'axios';
import { getWeatherCache, saveWeatherCache } from '../models/weathercache.model.js';

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

// TTL for cache in minutes (optional)
const CACHE_TTL_MINUTES = 10;

export const fetchWeatherByCoords = async (lat, lon) => {
  const locationKey = `${lat},${lon}`;

  // 1. Check cache (optional)
  const cached = await getWeatherCache(locationKey);
  if (cached) {
    const cachedAt = new Date(cached.cachedAt);
    const now = new Date();
    const diffMinutes = (now - cachedAt) / (1000 * 60);
    if (diffMinutes < CACHE_TTL_MINUTES) {
      return cached.weatherData;
    }
  }

  // 2. Fetch from OpenWeatherMap
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;
  const response = await axios.get(url);

  // 3. Save to cache (optional)
  await saveWeatherCache(locationKey, response.data);

  return response.data;
};
