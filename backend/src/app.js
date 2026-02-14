// backend/src/app.js

const express = require('express');
const app = express();

// Загружаем переменные окружения и конфиг
require('dotenv').config();
const config = require('./config/env');

// Подключаемся к базе данных
const connectDB = require('./config/database');
connectDB();

// Импорт middleware
const corsMiddleware = require('./middleware/cors');
const errorHandler = require('./middleware/errorHandler');

// Импорт роутов
const newsRoutes = require('./routes/news');
const eventsRoutes = require('./routes/events');

// Импорт и запуск планировщика для автоматического парсинга новостей
const { startScheduler } = require('./services/scheduler');
startScheduler();

// Middleware для парсинга JSON
app.use(express.json({ limit: '10mb' })); // Ограничение размера тела запроса для безопасности

// CORS middleware
app.use(corsMiddleware);

// Базовый роут для проверки здоровья API
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString(),
  });
});

// Монтируем роуты
app.use('/api/news', newsRoutes);     // Роуты для новостей: /api/news
app.use('/api/events', eventsRoutes); // Роуты для событий: /api/events

// Middleware для обработки ошибок (должен быть последним)
app.use(errorHandler);

// Экспортируем приложение для использования в server.js
module.exports = app;