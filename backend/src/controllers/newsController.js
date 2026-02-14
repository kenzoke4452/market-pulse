// backend/src/controllers/newsController.js

const News = require('../models/News'); // Импорт модели News

// Функция для получения списка новостей с фильтрами
const getNews = async (req, res) => {
  try {
    // Получаем query параметры для фильтров
    const {
      currency,      // Фильтр по affectedAssets: 'crypto', 'stocks', 'indices' (можно несколько через запятую)
      sentiment,     // Фильтр по sentiment: 'bullish', 'bearish'
      source,        // Фильтр по источнику (например, 'Bloomberg')
      fromDate,      // Фильтр по дате: от (ISO string)
      toDate,        // Фильтр по дате: до (ISO string)
      limit = 20,    // Лимит новостей на страницу (дефолт 20)
      page = 1,      // Номер страницы (дефолт 1)
      sortBy = 'publishDate', // Сортировка: 'publishDate', 'title', etc.
      sortOrder = 'desc',     // Порядок: 'asc' или 'desc'
    } = req.query;

    // Строим фильтр для MongoDB
    const filter = {};

    // Фильтр по affectedAssets (валюты)
    if (currency) {
      const currencies = currency.split(',').map(c => c.trim());
      filter.affectedAssets = { $in: currencies }; // affectedAssets - массив в модели
    }

    // Фильтр по sentiment
    if (sentiment) {
      filter.sentiment = sentiment;
    }

    // Фильтр по источнику
    if (source) {
      filter.source = source;
    }

    // Фильтр по дате
    if (fromDate || toDate) {
      filter.publishDate = {};
      if (fromDate) filter.publishDate.$gte = new Date(fromDate);
      if (toDate) filter.publishDate.$lte = new Date(toDate);
    }

    // Пагинация
    const skip = (page - 1) * limit;
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Запрос к базе данных
    const news = await News.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    // Общее количество для пагинации
    const total = await News.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: news,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching news',
    });
  }
};

// Опциональная функция для получения одной новости по ID (если нужна детальная страница)
const getNewsById = async (req, res) => {
  try {
    const { id } = req.params;
    const newsItem = await News.findById(id);

    if (!newsItem) {
      return res.status(404).json({
        success: false,
        message: 'News not found',
      });
    }

    res.status(200).json({
      success: true,
      data: newsItem,
    });
  } catch (error) {
    console.error('Error fetching news by ID:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching news',
    });
  }
};

// Опциональная функция для создания новости вручную (для тестирования или админки)
// Предполагаем, что sentiment рассчитывается автоматически в сервисе
const createNews = async (req, res) => {
  try {
    const { title, content, source, affectedAssets, sentiment } = req.body;

    // Валидация (базовая)
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required',
      });
    }

    const newNews = new News({
      title,
      content,
      source,
      affectedAssets, // Массив: ['crypto', 'stocks']
      sentiment,      // 'bullish' или 'bearish' (или рассчитать в сервисе)
      publishDate: new Date(),
    });

    await newNews.save();

    res.status(201).json({
      success: true,
      data: newNews,
    });
  } catch (error) {
    console.error('Error creating news:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating news',
    });
  }
};

// Экспортируем функции для использования в routes/news.js
module.exports = {
  getNews,
  getNewsById, // Опционально
  createNews,  // Опционально, если не нужна - удалите
};