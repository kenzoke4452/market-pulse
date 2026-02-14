// backend/src/middleware/errorHandler.js

// Middleware для централизованной обработки ошибок в Express
const errorHandler = (err, req, res, next) => {
  // Логируем ошибку для отладки (в продакшене используйте winston или другой логгер)
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);

  // Определяем статус ошибки (дефолт 500 для внутренних ошибок)
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Специфические обработки для известных ошибок
  if (err.name === 'ValidationError') {
    // Ошибка валидации Mongoose
    statusCode = 400;
    message = 'Validation Error';
  } else if (err.name === 'CastError') {
    // Ошибка приведения типов в Mongoose (например, неверный ID)
    statusCode = 400;
    message = 'Invalid ID format';
  } else if (err.code === 11000) {
    // Дубликат ключа в MongoDB
    statusCode = 400;
    message = 'Duplicate field value';
  }

  // В продакшене не показываем детали стека
  const isProduction = process.env.NODE_ENV === 'production';
  const errorResponse = {
    success: false,
    message,
    ...(isProduction ? {} : { stack: err.stack }), // Показываем стек только в разработке
  };

  // Возвращаем JSON-ответ
  res.status(statusCode).json(errorResponse);
};

// Экспортируем middleware
module.exports = errorHandler;