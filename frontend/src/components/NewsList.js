// frontend/src/components/NewsList.js

import React, { useState, useEffect } from 'react';
import NewsCard from './NewsCard'; // Импорт компонента карточки новости
import { getNews } from '../services/api'; // Импорт функции API для получения новостей

const NewsList = ({ filters }) => {
  // State для новостей, загрузки, ошибки, пагинации
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Функция загрузки новостей
  const loadNews = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      // Подготовка параметров для API (фильтры + пагинация)
      const params = {
        ...filters,
        page,
        limit: 20, // Фиксированный лимит, можно сделать configurable
      };

      // Преобразование фильтров в query string
      if (filters.currencies && filters.currencies.length > 0) {
        params.currency = filters.currencies.join(',');
      }
      if (filters.sentiment) {
        params.sentiment = filters.sentiment;
      }
      if (filters.source) {
        params.source = filters.source;
      }
      if (filters.fromDate) {
        params.fromDate = filters.fromDate;
      }
      if (filters.toDate) {
        params.toDate = filters.toDate;
      }

      const response = await getNews(params);
      setNews(response.data.data);
      setTotalPages(response.data.pagination.pages);
      setCurrentPage(page);
    } catch (err) {
      setError('Failed to load news. Please try again.');
      console.error('Error loading news:', err);
    } finally {
      setLoading(false);
    }
  };

  // Загрузка новостей при изменении фильтров или страницы
  useEffect(() => {
    loadNews(1); // Сброс на первую страницу при изменении фильтров
  }, [filters]);

  // Обработчик изменения страницы
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      loadNews(page);
    }
  };

  // Отображение загрузки
  if (loading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Loading news...</div>;
  }

  // Отображение ошибки
  if (error) {
    return <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>{error}</div>;
  }

  return (
    <div>
      {/* Список новостей */}
      {news.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>No news found.</div>
      ) : (
        news.map((item) => (
          <NewsCard key={item._id} newsItem={item} />
        ))
      )}

      {/* Пагинация */}
      {totalPages > 1 && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '20px',
          gap: '10px'
        }}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              padding: '8px 16px',
              backgroundColor: currentPage === 1 ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
            }}
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              padding: '8px 16px',
              backgroundColor: currentPage === totalPages ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsList;