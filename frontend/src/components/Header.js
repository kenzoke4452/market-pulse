// frontend/src/components/Header.js

import React from 'react';

const Header = () => {
  return (
    <header style={{
      backgroundColor: '#007bff',
      color: 'white',
      padding: '15px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      {/* Логотип или название */}
      <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
        Financial News Aggregator
      </div>

      {/* Навигация (простая, без роутера для базовой версии) */}
      <nav>
        <ul style={{
          listStyle: 'none',
          display: 'flex',
          gap: '20px',
          margin: 0,
          padding: 0
        }}>
          <li>
            <a href="/" style={{ color: 'white', textDecoration: 'none' }}>
              Home
            </a>
          </li>
          <li>
            <a href="/events" style={{ color: 'white', textDecoration: 'none' }}>
              Upcoming Events
            </a>
          </li>
          {/* Добавьте больше ссылок, если нужны (например, About) */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;