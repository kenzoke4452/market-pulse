// backend/src/services/sentimentAnalyzer.js

const Sentiment = require('sentiment'); // Установите через npm install sentiment

// Инициализируем анализатор sentiment
const sentiment = new Sentiment();

// Функция для анализа текста и определения bullish/bearish
const analyzeSentiment = (text) => {
  try {
    // Анализируем текст: возвращает объект с score (число: положительное - позитив, отрицательное - негатив)
    const result = sentiment.analyze(text);

    // Логика определения: если score > 0 -> bullish (позитивный), иначе bearish (негативный или нейтральный)
    // Можно настроить порог, например, score >= 1 для bullish, но для простоты используем > 0
    const sentimentLabel = result.score > 0 ? 'bullish' : 'bearish';

    console.log(`Sentiment analysis for "${text.substring(0, 50)}...": Score ${result.score} -> ${sentimentLabel}`);
    return sentimentLabel;
  } catch (error) {
    console.error('Error analyzing sentiment:', error);
    // В случае ошибки возвращаем дефолт (например, bearish или neutral, но по требованиям - bullish/bearish)
    return 'bearish'; // Дефолт на bearish, если анализ не удался
  }
};

// Экспортируем функцию для использования в newsParser.js
module.exports = {
  analyzeSentiment,
};