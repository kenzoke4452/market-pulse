// backend/src/middleware/cors.js

const cors = require('cors'); // Установите через npm install cors

// Опции для CORS
const corsOptions = {
  origin: function (origin, callback) {
    // Разрешаем запросы без origin (например, Postman) или из списка разрешенных
    const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:3000']; // Дефолт для разработки (React на localhost:3000)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Разрешенные HTTP-методы
  allowedHeaders: ['Content-Type', 'Authorization'], // Разрешенные заголовки (для JWT и JSON)
  credentials: true, // Разрешить cookies/credentials, если фронтенд использует их
};

// Экспортируем настроенный middleware
module.exports = cors(corsOptions);