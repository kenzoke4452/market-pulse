// backend/src/middleware/auth.js

const jwt = require('jsonwebtoken'); // Установите через npm install jsonwebtoken

// Middleware для проверки JWT-токена
const authenticateToken = (req, res, next) => {
  // Получаем токен из заголовка Authorization (формат: "Bearer <token>")
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Извлекаем токен после "Bearer"

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token is required',
    });
  }

  // Проверяем токен с использованием секрета из переменных окружения
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: 'Invalid or expired token',
      });
    }

    // Добавляем данные пользователя в req для использования в контроллерах
    req.user = user; // user содержит payload из токена (например, { id, role })
    next(); // Продолжаем выполнение
  });
};

// Опциональная функция для проверки роли (например, только админы могут создавать новости)
// Используйте после authenticateToken
const authorizeRole = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== requiredRole) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions',
      });
    }
    next();
  };
};

// Экспортируем middleware
module.exports = {
  authenticateToken,
  authorizeRole,
};