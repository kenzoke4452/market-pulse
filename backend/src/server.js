// backend/src/server.js

const app = require('./app'); // Импорт настроенного Express-приложения из app.js
const { PORT } = require('./config/env'); // Импорт порта из конфига

// Запуск сервера
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});

// Обработка ошибок запуска сервера (например, если порт занят)
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please choose a different port.`);
  } else {
    console.error('Server error:', err);
  }
  process.exit(1); // Завершаем процесс при ошибке
});

// Опционально: graceful shutdown (для продакшена, чтобы корректно закрыть соединения)
process.on('SIGINT', () => {
  console.log('Shutting down server gracefully...');
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});