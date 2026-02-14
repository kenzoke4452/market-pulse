// frontend/src/components/NewsCard.js

import React from 'react';

const NewsCard = ({ newsItem }) => {
  // Форматирование даты для отображения
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Определение цвета для sentiment
  const getSentimentColor = (sentiment) => {
    return sentiment === 'bullish' ? '#28a745' : '#dc3545'; // Зеленый для bullish, красный для bearish
  };

  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '15px',
      marginBottom: '15px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      transition: 'box-shadow 0.2s',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)'}
    onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'}
    >
      {/* Заголовок новости */}
      <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>
        {newsItem.title}
      </h4>

      {/* Источник и дата */}
      <div style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}>
        <span><strong>Source:</strong> {newsItem.source}</span> | 
        <span><strong>Published:</strong> {formatDate(newsItem.publishDate)}</span>
      </div>

      {/* Sentiment с цветом */}
      <div style={{ marginBottom: '10px' }}>
        <span style={{
          backgroundColor: getSentimentColor(newsItem.sentiment),
          color: 'white',
          padding: '2px 8px',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: 'bold'
        }}>
          {newsItem.sentiment.toUpperCase()}
        </span>
      </div>

      {/* Affected Assets */}
      <div style={{ marginBottom: '10px' }}>
        <strong>Affected Assets:</strong> {newsItem.affectedAssets.join(', ') || 'General'}
      </div>

      {/* Содержание новости (обрезанное) */}
      <p style={{ color: '#555', lineHeight: '1.5' }}>
        {newsItem.content.length > 200 ? `${newsItem.content.substring(0, 200)}...` : newsItem.content}
      </p>

      {/* Ссылка на полную новость (если есть) */}
      {newsItem.url && (
        <a href={newsItem.url} target="_blank" rel="noopener noreferrer" style={{
          color: '#007bff',
          textDecoration: 'none',
          fontSize: '14px'
        }}>
          Read more
        </a>
      )}
    </div>
  );
};

export default NewsCard;