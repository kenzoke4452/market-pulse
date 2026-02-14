// backend/src/config/database.js

const mongoose = require('mongoose');

// Функция для подключения к базе данных MongoDB
const connectDB = async () => {
  try {
    // Получаем URI из переменных окружения (например, MONGO_URI=mongodb://localhost:27017/financial-news)
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/financial-news';

    // Подключаемся к MongoDB с опциями для стабильности
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Дополнительные опции, если нужно (например, для аутентификации)
      // user: process.env.DB_USER,
      // pass: process.env.DB_PASS,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    // В продакшене можно добавить логирование или выход из процесса
    process.exit(1);
  }
};

// Экспортируем функцию для использования в app.js или server.js
module.exports = connectDB;