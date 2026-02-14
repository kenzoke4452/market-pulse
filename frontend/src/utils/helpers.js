// frontend/src/utils/helpers.js

// Функция для форматирования даты в читаемый вид
export const formatDate = (dateString, options = {}) => {
  const date = new Date(dateString);
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return date.toLocaleDateString('en-US', { ...defaultOptions, ...options });
};

// Функция для обрезки текста с добавлением "..."
export const truncateText = (text, maxLength = 200) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Функция для преобразования массива фильтров в строку для API (например, currencies)
export const arrayToQueryString = (array, key) => {
  if (!array || array.length === 0) return '';
  return `${key}=${array.join(',')}`;
};

// Функция для преобразования объекта фильтров в query-параметры
export const filtersToQueryParams = (filters) => {
  const params = {};
  if (filters.currencies && filters.currencies.length > 0) {
    params.currency = filters.currencies.join(',');
  }
  if (filters.sentiment) {
    params.sentiment = filters.sentiment;
  }
  if (filters.source) {
    params.source = filters.source;
  }
  if (filters.fromDate) {
    params.fromDate = filters.fromDate;
  }
  if (filters.toDate) {
    params.toDate = filters.toDate;
  }
  return params;
};

// Функция для валидации email (если понадобится для форм)
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Функция для получения цвета sentiment
export const getSentimentColor = (sentiment) => {
  const colors = {
    bullish: '#28a745',
    bearish: '#dc3545',
  };
  return colors[sentiment] || '#6c757d'; // Дефолт серый
};

// Функция для капитализации первой буквы
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Функция для задержки (debounce) для поиска или фильтров
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

// Функция для проверки, является ли объект пустым
export const isEmptyObject = (obj) => {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
};

// Можно добавить больше функций по необходимости, например, для сортировки или API-ошибок