// backend/src/services/scheduler.js

const cron = require('node-cron'); // Установите через npm install node-cron
const { parseNews } = require('./newsParser'); // Импорт функции парсинга новостей

// Функция для запуска планировщика
const startScheduler = () => {
  // Запускаем парсинг новостей каждые 5 минут (cron-выражение: '*/5 * * * *')
  // Это означает: каждые 5 минут, каждый час, каждый день
  cron.schedule('*/5 * * * *', async () => {
    console.log('Starting scheduled news parsing...');
    try {
      await parseNews(); // Вызываем функцию парсинга
      console.log('Scheduled news parsing completed successfully.');
    } catch (error) {
      console.error('Error during scheduled news parsing:', error);
      // В продакшене можно добавить отправку уведомлений (например, через email или Slack)
    }
  });

  console.log('News parsing scheduler started. Will run every 5 minutes.');
};

// Опционально: функция для ручного запуска парсинга (для тестирования)
const runManualParse = async () => {
  console.log('Running manual news parsing...');
  try {
    await parseNews();
    console.log('Manual news parsing completed.');
  } catch (error) {
    console.error('Error during manual parsing:', error);
  }
};

// Экспортируем функции для использования в app.js или server.js
module.exports = {
  startScheduler,
  runManualParse, // Опционально, для тестирования
};