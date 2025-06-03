// src/models/weatherCacheModel.js
import ddbDocClient from '../config/dynamoClient.js';
import { PutCommand, GetCommand } from '@aws-sdk/lib-dynamodb';

const TABLE_NAME = process.env.WEATHER_CACHE_TABLE || 'WeatherAppWeatherCache';

export const saveWeatherCache = async (locationKey, weatherData) => {
  const params = {
    TableName: TABLE_NAME,
    Item: {
      locationKey, // e.g., "28.61,77.20"
      weatherData,
      cachedAt: new Date().toISOString(),
    },
  };
  await ddbDocClient.send(new PutCommand(params));
};

export const getWeatherCache = async (locationKey) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { locationKey },
  };
  const result = await ddbDocClient.send(new GetCommand(params));
  return result.Item;
};

