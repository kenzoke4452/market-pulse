// backend/src/services/newsParser.js

const Parser = require('rss-parser'); // Установите через npm install rss-parser
const cheerio = require('cheerio'); // Установите через npm install cheerio (для парсинга HTML, если нужно)
const News = require('../models/News'); // Импорт модели News
const { analyzeSentiment } = require('./sentimentAnalyzer'); // Импорт функции анализа sentiment

// Инициализируем RSS-парсер
const parser = new Parser();

// Функция для определения affectedAssets на основе ключевых слов в title и content
const determineAffectedAssets = (title, content) => {
  const text = `${title} ${content}`.toLowerCase();
  const assets = [];

  if (text.includes('crypto') || text.includes('bitcoin') || text.includes('ethereum')) {
    assets.push('crypto');
  }
  if (text.includes('stock') || text.includes('shares') || text.includes('equity')) {
    assets.push('stocks');
  }
  if (text.includes('index') || text.includes('s&p') || text.includes('dow')) {
    assets.push('indices');
  }

  return assets.length > 0 ? assets : ['general']; // Дефолт 'general', если ничего не найдено
};

// Основная функция парсинга новостей
const parseNews = async () => {
  try {
    // Получаем список источников из конфига (env.js)
    const sources = require('../config/env').NEWS_SOURCES || ['https://feeds.bbci.co.uk/news/rss.xml']; // Дефолтный источник для примера

    for (const sourceUrl of sources) {
      console.log(`Parsing news from: ${sourceUrl}`);

      // Парсим RSS-фид
      const feed = await parser.parseURL(sourceUrl);

      // Обрабатываем каждую новость из фида
      for (const item of feed.items) {
        const title = item.title;
        const content = item.contentSnippet || item.content || ''; // Используем snippet или полный контент
        const url = item.link;
        const publishDate = new Date(item.pubDate || Date.now());

        // Проверяем, существует ли уже новость (по title или url, чтобы избежать дубликатов)
        const existingNews = await News.findOne({ $or: [{ title }, { url }] });
        if (existingNews) {
          console.log(`News already exists: ${title}`);
          continue; // Пропускаем дубликат
        }

        // Определяем affectedAssets на основе текста
        const affectedAssets = determineAffectedAssets(title, content);

        // Анализируем sentiment (bullish/bearish)
        const sentiment = await analyzeSentiment(title + ' ' + content);

        // Создаем и сохраняем новость
        const newNews = new News({
          title,
          content,
          source: feed.title || 'Unknown', // Источник из фида
          sentiment,
          affectedAssets,
          publishDate,
          url,
        });

        await newNews.save();
        console.log(`Saved news: ${title} (Sentiment: ${sentiment})`);
      }
    }

    console.log('News parsing completed.');
  } catch (error) {
    console.error('Error parsing news:', error);
    // В продакшене можно добавить логирование или отправку уведомлений
  }
};

// Экспортируем функцию для использования в scheduler.js
module.exports = {
  parseNews,
};