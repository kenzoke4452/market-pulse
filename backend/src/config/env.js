// backend/src/config/env.js

// Загружаем переменные окружения из файла .env в process.env
// Установите dotenv через npm install dotenv
require('dotenv').config();

// Опционально: экспортируем ключевые переменные для удобства (чтобы не писать process.env каждый раз)
// Например:
module.exports = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/financial-news',
  NODE_ENV: process.env.NODE_ENV || 'development',
  // Добавьте другие переменные по необходимости (например, API-ключи для парсинга или анализа)
  NEWS_SOURCES: process.env.NEWS_SOURCES ? process.env.NEWS_SOURCES.split(',') : ['https://example.com/rss'], // Массив источников для парсинга
  SENTIMENT_API_KEY: process.env.SENTIMENT_API_KEY, // Если используете внешний API для анализа sentiment
};