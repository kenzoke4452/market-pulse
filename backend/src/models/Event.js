// backend/src/models/Event.js

const mongoose = require('mongoose');

// Схема для модели Event (предстоящие события, публикуемые за 3 дня)
const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true, // Убираем лишние пробелы
  },
  description: {
    type: String,
    trim: true,
  },
  eventDate: {
    type: Date,
    required: [true, 'Event date is required'],
  },
  publishDate: {
    type: Date,
    required: [true, 'Publish date is required'], // Рассчитывается как eventDate - 3 дня
  },
  affectedAssets: {
    type: [String], // Массив строк: ['crypto', 'stocks', 'indices']
    default: [],
  },
  // Опционально: добавьте поле source, если события парсятся из источников
  source: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true, // Автоматически добавляет createdAt и updatedAt
});

// Индексы для оптимизации запросов
eventSchema.index({ publishDate: 1 }); // Для фильтрации опубликованных событий
eventSchema.index({ eventDate: 1 });  // Для сортировки по дате события
eventSchema.index({ affectedAssets: 1 }); // Для фильтрации по валютам

// Экспортируем модель
module.exports = mongoose.model('Event', eventSchema);