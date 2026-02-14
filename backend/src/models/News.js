// backend/src/models/News.js

const mongoose = require('mongoose');

// Схема для модели News (финансовые новости с анализом sentiment)
const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true, // Убираем лишние пробелы
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true,
  },
  source: {
    type: String,
    trim: true, // Источник новости (например, 'Bloomberg')
  },
  sentiment: {
    type: String,
    enum: ['bullish', 'bearish'], // Только эти значения
    required: [true, 'Sentiment is required'], // Рассчитывается алгоритмом
  },
  affectedAssets: {
    type: [String], // Массив строк: ['crypto', 'stocks', 'indices']
    default: [],
  },
  publishDate: {
    type: Date,
    default: Date.now, // Дата публикации (по умолчанию текущая)
  },
  // Опционально: добавьте поле для URL новости, если парсите ссылки
  url: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true, // Автоматически добавляет createdAt и updatedAt
});

// Индексы для оптимизации запросов и фильтров
newsSchema.index({ sentiment: 1 }); // Для фильтрации по bullish/bearish
newsSchema.index({ affectedAssets: 1 }); // Для фильтрации по валютам
newsSchema.index({ publishDate: -1 }); // Для сортировки по дате (новые сверху)
newsSchema.index({ source: 1 }); // Для фильтрации по источнику

// TTL-индекс для автоматического удаления новостей через 3 дня (259200 секунд = 3 дня * 24 часа * 3600 сек)
newsSchema.index({ createdAt: 1 }, { expireAfterSeconds: 259200 });

// Экспортируем модель
module.exports = mongoose.model('News', newsSchema);