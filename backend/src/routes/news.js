// backend/src/routes/news.js

const express = require('express');
const router = express.Router();

// Импорт контроллера новостей
const { getNews, getNewsById, createNews } = require('../controllers/newsController');

// Импорт middleware для аутентификации (если createNews требует защиты)
// const { authenticateToken, authorizeRole } = require('../middleware/auth');

// Роут для получения списка новостей с фильтрами (GET /api/news)
// Поддерживает query параметры: currency, sentiment, source, fromDate, toDate, limit, page, sortBy, sortOrder
router.get('/', getNews);

// Роут для получения одной новости по ID (GET /api/news/:id)
router.get('/:id', getNewsById);

// Роут для создания новости (POST /api/news) - опционально, для тестирования или админки
// Добавьте аутентификацию, если нужно: router.post('/', authenticateToken, authorizeRole('admin'), createNews);
router.post('/', createNews); // Без аутентификации для простоты; раскомментируйте выше для защиты

// Экспортируем роутер для использования в app.js
module.exports = router;