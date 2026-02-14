// frontend/src/components/Filters.js

import React, { useState } from 'react';

const Filters = ({ onApplyFilters }) => {
  // Локальный state для фильтров
  const [filters, setFilters] = useState({
    currencies: [], // Массив выбранных валют: ['crypto', 'stocks', 'indices']
    sentiment: '', // 'bullish', 'bearish', или '' для всех
    source: '', // Источник (опционально, селект или input)
    fromDate: '',
    toDate: '',
  });

  // Обработчик изменения чекбоксов для валют
  const handleCurrencyChange = (currency) => {
    setFilters((prev) => ({
      ...prev,
      currencies: prev.currencies.includes(currency)
        ? prev.currencies.filter((c) => c !== currency) // Убрать, если уже выбрано
        : [...prev.currencies, currency], // Добавить
    }));
  };

  // Обработчик изменения sentiment
  const handleSentimentChange = (e) => {
    setFilters((prev) => ({ ...prev, sentiment: e.target.value }));
  };

  // Обработчик изменения source
  const handleSourceChange = (e) => {
    setFilters((prev) => ({ ...prev, source: e.target.value }));
  };

  // Обработчик изменения дат
  const handleDateChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  // Применить фильтры (вызвать родительскую функцию)
  const applyFilters = () => {
    onApplyFilters(filters);
  };

  // Сбросить фильтры
  const resetFilters = () => {
    setFilters({
      currencies: [],
      sentiment: '',
      source: '',
      fromDate: '',
      toDate: '',
    });
    onApplyFilters({}); // Сброс в родителе
  };

  return (
    <div style={{
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      marginBottom: '20px',
      backgroundColor: '#f9f9f9'
    }}>
      <h3>Filters</h3>

      {/* Фильтр по валютам (чекбоксы) */}
      <div>
        <label><strong>Affected Assets:</strong></label><br />
        {['crypto', 'stocks', 'indices'].map((currency) => (
          <label key={currency} style={{ marginRight: '10px' }}>
            <input
              type="checkbox"
              checked={filters.currencies.includes(currency)}
              onChange={() => handleCurrencyChange(currency)}
            />
            {currency.charAt(0).toUpperCase() + currency.slice(1)}
          </label>
        ))}
      </div>

      {/* Фильтр по sentiment (радио-кнопки) */}
      <div style={{ marginTop: '10px' }}>
        <label><strong>Sentiment:</strong></label><br />
        <label style={{ marginRight: '10px' }}>
          <input
            type="radio"
            value=""
            checked={filters.sentiment === ''}
            onChange={handleSentimentChange}
          />
          All
        </label>
        <label style={{ marginRight: '10px' }}>
          <input
            type="radio"
            value="bullish"
            checked={filters.sentiment === 'bullish'}
            onChange={handleSentimentChange}
          />
          Bullish
        </label>
        <label>
          <input
            type="radio"
            value="bearish"
            checked={filters.sentiment === 'bearish'}
            onChange={handleSentimentChange}
          />
          Bearish
        </label>
      </div>

      {/* Фильтр по источнику (селект) */}
      <div style={{ marginTop: '10px' }}>
        <label><strong>Source:</strong></label><br />
        <select value={filters.source} onChange={handleSourceChange}>
          <option value="">All Sources</option>
          <option value="Bloomberg">Bloomberg</option>
          <option value="Reuters">Reuters</option>
          <option value="CNN">CNN</option>
          {/* Добавьте больше источников по необходимости */}
        </select>
      </div>

      {/* Фильтр по датам */}
      <div style={{ marginTop: '10px' }}>
        <label><strong>Date Range:</strong></label><br />
        <input
          type="date"
          value={filters.fromDate}
          onChange={(e) => handleDateChange('fromDate', e.target.value)}
          placeholder="From"
        />
        <input
          type="date"
          value={filters.toDate}
          onChange={(e) => handleDateChange('toDate', e.target.value)}
          placeholder="To"
          style={{ marginLeft: '10px' }}
        />
      </div>

      {/* Кнопки */}
      <div style={{ marginTop: '15px' }}>
        <button onClick={applyFilters} style={{ marginRight: '10px', padding: '8px 16px' }}>
          Apply Filters
        </button>
        <button onClick={resetFilters} style={{ padding: '8px 16px' }}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Filters;