// frontend/src/pages/Home.js

import React, { useState } from 'react';
import Header from '../components/Header'; // Импорт шапки
import Filters from '../components/Filters'; // Импорт фильтров
import NewsList from '../components/NewsList'; // Импорт списка новостей
import Disclaimer from '../components/Disclaimer'; // Импорт disclaimer

const Home = () => {
  // State для примененных фильтров (передается в NewsList)
  const [appliedFilters, setAppliedFilters] = useState({});

  // Функция для применения фильтров (вызывается из Filters)
  const handleApplyFilters = (filters) => {
    setAppliedFilters(filters);
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
        <h1>Financial News</h1>
        <p>Aggregated financial news with sentiment analysis. Filter by assets, sentiment, and more.</p>

        {/* Фильтры */}
        <Filters onApplyFilters={handleApplyFilters} />

        {/* Список новостей */}
        <NewsList filters={appliedFilters} />
      </main>

      {/* Disclaimer внизу */}
      <Disclaimer />
    </div>
  );
};

export default Home;