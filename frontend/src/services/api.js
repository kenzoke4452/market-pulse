// frontend/src/services/api.js

import axios from 'axios'; // Установите через npm install axios

// Базовый URL бэкенда (измените на продакшен, если нужно)
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

// Создание экземпляра axios с базовыми настройками
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // Таймаут 10 секунд
  headers: {
    'Content-Type': 'application/json',
  },
});

// Функция для получения новостей с фильтрами и пагинацией
const getNews = async (params = {}) => {
  try {
    const response = await api.get('/news', { params });
    return response.data; // Возвращает { success, data, pagination }
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error; // Перебрасываем ошибку для обработки в компоненте
  }
};

// Функция для получения одной новости по ID
const getNewsById = async (id) => {
  try {
    const response = await api.get(`/news/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching news by ID:', error);
    throw error;
  }
};

// Функция для получения событий с фильтрами и пагинацией
const getEvents = async (params = {}) => {
  try {
    const response = await api.get('/events', { params });
    return response.data; // Возвращает { success, data, pagination }
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

// Функция для создания новости (опционально, если нужна админ-функция)
const createNews = async (newsData) => {
  try {
    const response = await api.post('/news', newsData);
    return response.data;
  } catch (error) {
    console.error('Error creating news:', error);
    throw error;
  }
};

// Функция для создания события (опционально)
const createEvent = async (eventData) => {
  try {
    const response = await api.post('/events', eventData);
    return response.data;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

// Функция для проверки здоровья API
const getHealth = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    console.error('Error checking API health:', error);
    throw error;
  }
};

// Экспортируем функции для использования в компонентах
export {
  getNews,
  getNewsById,
  getEvents,
  createNews,
  createEvent,
  getHealth,
};