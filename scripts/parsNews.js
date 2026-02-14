// backend/scripts/parseNews.js

// Скрипт для ручного запуска парсинга новостей (для тестирования)
// Запуск: node scripts/parseNews.js

require('dotenv').config(); // Загружаем переменные окружения
const connectDB = require('../src/config/database'); // Подключаемся к DB
const { parseNews } = require('../src/services/newsParser'); // Импорт функции парсинга

// Функция для запуска парсинга
const runParse = async () => {
  try {
    console.log('Connecting to database...');
    await connectDB(); // Подключаемся к MongoDB

    console.log('Starting manual news parsing...');
    await parseNews(); // Запускаем парсинг

    console.log('Manual news parsing completed successfully.');
    process.exit(0); // Выход с успехом
  } catch (error) {
    console.error('Error during manual parsing:', error);
    process.exit(1); // Выход с ошибкой
  }
};

// Запуск скрипта
runParse();