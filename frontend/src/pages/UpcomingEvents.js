// frontend/src/pages/UpcomingEvents.js

import React, { useState, useEffect } from 'react';
import Header from '../components/Header'; // Импорт шапки
import Disclaimer from '../components/Disclaimer'; // Импорт disclaimer
import { getEvents } from '../services/api'; // Импорт функции API для получения событий

const UpcomingEvents = () => {
  // State для событий, загрузки, ошибки, пагинации
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({}); // Фильтры (например, currency)

  // Функция загрузки событий
  const loadEvents = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const params = { ...filters, page, limit: 10 };
      const response = await getEvents(params);
      setEvents(response.data.data);
      setTotalPages(response.data.pagination.pages);
      setCurrentPage(page);
    } catch (err) {
      setError('Failed to load events. Please try again.');
      console.error('Error loading events:', err);
    } finally {
      setLoading(false);
    }
  };

  // Загрузка событий при монтировании или изменении фильтров
  useEffect(() => {
    loadEvents(1);
  }, [filters]);

  // Обработчик изменения страницы
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      loadEvents(page);
    }
  };

  // Обработчик фильтра по currency (простой селект)
  const handleCurrencyChange = (e) => {
    setFilters({ currency: e.target.value });
  };

  // Форматирование даты
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div>
      {/* Шапка */}
      <Header />

      {/* Основной контент */}
      <main style={{
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif'
      }}>
        <h1>Upcoming Events</h1>
        <p>Events published 3 days in advance, such as Federal Reserve meetings.</p>

        {/* Фильтр по currency */}
        <div style={{ marginBottom: '20px' }}>
          <label><strong>Filter by Affected Assets:</strong></label>
          <select value={filters.currency || ''} onChange={handleCurrencyChange} style={{ marginLeft: '10px' }}>
            <option value="">All</option>
            <option value="crypto">Crypto</option>
            <option value="stocks">Stocks</option>
            <option value="indices">Indices</option>
          </select>
        </div>

        {/* Отображение загрузки */}
        {loading && <div style={{ textAlign: 'center', padding: '20px' }}>Loading events...</div>}

        {/* Отображение ошибки */}
        {error && <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>{error}</div>}

        {/* Список событий */}
        {!loading && !error && (
          <div>
            {events.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '20px' }}>No upcoming events found.</div>
            ) : (
              events.map((event) => (
                <div key={event._id} style={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '15px',
                  marginBottom: '15px',
                  backgroundColor: '#fff',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                  <h4>{event.title}</h4>
                  <p>{event.description}</p>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    <strong>Event Date:</strong> {formatDate(event.eventDate)} | 
                    <strong>Published:</strong> {formatDate(event.publishDate)} | 
                    <strong>Affected Assets:</strong> {event.affectedAssets.join(', ') || 'General'}
                  </div>
                </div>
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
        )}
      </main>

      {/* Disclaimer внизу */}
      <Disclaimer />
    </div>
  );
};

export default UpcomingEvents;