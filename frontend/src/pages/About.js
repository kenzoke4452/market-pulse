// frontend/src/pages/About.js

import React from 'react';
import Header from '../components/Header'; // Импорт шапки
import Disclaimer from '../components/Disclaimer'; // Импорт disclaimer

const About = () => {
  return (
    <div>
      {/* Шапка */}
      <Header />

      {/* Основной контент */}
      <main style={{
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif',
        lineHeight: '1.6'
      }}>
        <h1>About Financial News Aggregator</h1>
        <p>
          Welcome to the Financial News Aggregator, a platform designed to collect and analyze financial news from various public sources. Our goal is to provide users with timely information on market trends, focusing on assets like cryptocurrencies, stocks, and indices.
        </p>
        <p>
          Key features include:
        </p>
        <ul>
          <li>Automatic news parsing every 5 minutes from RSS feeds.</li>
          <li>Sentiment analysis to classify news as bullish or bearish.</li>
          <li>Advanced filters by affected assets, sentiment, source, and date range.</li>
          <li>Upcoming events published 3 days in advance (e.g., Federal Reserve meetings).</li>
          <li>News retention for 3 days with automatic cleanup.</li>
        </ul>
        <p>
          This platform is built using modern web technologies: React for the frontend, Node.js and Express for the backend, MongoDB for data storage, and sentiment analysis libraries for processing news.
        </p>
        <p>
          For developers: The source code is available on GitHub. Contributions are welcome!
        </p>
        <p>
          Contact: If you have questions or feedback, reach out to the development team.
        </p>
      </main>

      {/* Disclaimer внизу */}
      <Disclaimer />
    </div>
  );
};

export default About;