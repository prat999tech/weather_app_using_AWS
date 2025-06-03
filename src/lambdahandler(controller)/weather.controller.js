// src/controllers/weatherController.js
import { fetchWeatherByCoords } from '../services/weather.service.js';
import { asyncHandler } from '../utils/asynchandler.js';
import { apiresponse } from '../utils/apiresponse.js';
import { apierror } from '../utils/apierror.js';

export const getWeatherByCoords = asyncHandler(async (event) => {
  const { lat, lon } = event.queryStringParameters || {};
  if (!lat || !lon) {
    throw new apierror(400, 'Latitude and longitude are required.');
  }
  const weather = await fetchWeatherByCoords(lat, lon);
  // Success response
  return {
    statusCode: 200,
    body: JSON.stringify(new apiresponse(200, weather)),
  };
});
