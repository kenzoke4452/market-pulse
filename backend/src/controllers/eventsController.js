// backend/src/controllers/eventcontroller.js

const Event = require('../models/Event'); // Импорт модели Event

// Функция для получения списка предстоящих событий
// Предполагаем, что события публикуются за 3 дня до eventDate (поле publishDate <= текущая дата)
const getEvents = async (req, res) => {
  try {
    // Получаем текущую дату
    const now = new Date();

    // Фильтры из query параметров (опционально: по affectedAssets, например, currency=crypto)
    const { currency, limit = 10, page = 1 } = req.query;
    const filter = { publishDate: { $lte: now } }; // Только опубликованные (за 3 дня или раньше)

    if (currency) {
      filter.affectedAssets = currency; // Фильтр по валютам (crypto, stocks, indices)
    }

    // Пагинация и сортировка (по eventDate ascending)
    const skip = (page - 1) * limit;
    const events = await Event.find(filter)
      .sort({ eventDate: 1 }) // Сортировка по дате события
      .skip(skip)
      .limit(parseInt(limit));

    // Общее количество для пагинации
    const total = await Event.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: events,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching events',
    });
  }
};

// Опциональная функция для создания нового события (если нужна админка или ручное добавление)
// Предполагаем, что publishDate рассчитывается как eventDate минус 3 дня
const createEvent = async (req, res) => {
  try {
    const { title, description, eventDate, affectedAssets } = req.body;

    // Валидация (базовая)
    if (!title || !eventDate) {
      return res.status(400).json({
        success: false,
        message: 'Title and eventDate are required',
      });
    }

    // Рассчитываем publishDate: за 3 дня до eventDate
    const publishDate = new Date(eventDate);
    publishDate.setDate(publishDate.getDate() - 3);

    const newEvent = new Event({
      title,
      description,
      eventDate: new Date(eventDate),
      publishDate,
      affectedAssets, // Массив или строка: ['crypto', 'stocks']
    });

    await newEvent.save();

    res.status(201).json({
      success: true,
      data: newEvent,
    });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating event',
    });
  }
};

// Экспортируем функции для использования в routes/events.js
module.exports = {
  getEvents,
  createEvent, // Опционально, если не нужна - удалите
};