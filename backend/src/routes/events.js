// backend/src/routes/events.js

const express = require('express');
const router = express.Router();

// Импорт контроллера событий
const { getEvents, createEvent } = require('../controllers/eventsController');

// Импорт middleware для аутентификации (если createEvent требует защиты)
// const { authenticateToken, authorizeRole } = require('../middleware/auth');

// Роут для получения списка предстоящих событий (GET /api/events)
// Поддерживает query параметры: currency, limit, page
router.get('/', getEvents);

// Роут для создания события (POST /api/events) - опционально, для тестирования или админки
// Добавьте аутентификацию, если нужно: router.post('/', authenticateToken, authorizeRole('admin'), createEvent);
router.post('/', createEvent); // Без аутентификации для простоты; раскомментируйте выше для защиты

// Экспортируем роутер для использования в app.js
module.exports = router;