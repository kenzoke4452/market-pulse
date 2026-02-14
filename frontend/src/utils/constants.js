// frontend/src/utils/constants.js

// Константы для фильтров и других элементов фронтенда

// Валюты/активы для фильтров
export const CURRENCIES = [
  { value: 'crypto', label: 'Crypto' },
  { value: 'stocks', label: 'Stocks' },
  { value: 'indices', label: 'Indices' },
];

// Sentiment для фильтров
export const SENTIMENTS = [
  { value: '', label: 'All' },
  { value: 'bullish', label: 'Bullish' },
  { value: 'bearish', label: 'Bearish' },
];

// Источники новостей (можно расширить)
export const SOURCES = [
  { value: '', label: 'All Sources' },
  { value: 'Bloomberg', label: 'Bloomberg' },
  { value: 'Reuters', label: 'Reuters' },
  { value: 'CNN', label: 'CNN' },
  {value: 'Investing', label: 'Investing'},
  {value: 'Business Standard', label: 'Business Standard'},
  // Добавьте больше по необходимости
];

// Цвета для sentiment (используйте в компонентах вместо хардкода)
export const SENTIMENT_COLORS = {
  bullish: '#28a745', // Зеленый
  bearish: '#dc3545', // Красный
};

// Лимиты для пагинации
export const PAGINATION_LIMITS = {
  news: 20,
  events: 10,
};

// Другие константы (например, для API, но лучше в .env)
export const DEFAULT_API_BASE_URL = 'http://localhost:5000/api';

// Сообщения ошибок
export const ERROR_MESSAGES = {
  loading: 'Loading...',
  noData: 'No data found.',
  fetchError: 'Failed to load data. Please try again.',
};

// Можно добавить больше, например, для дат или валидации