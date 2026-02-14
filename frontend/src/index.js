// frontend/src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Импорт главного компонента App

// Рендеринг приложения в DOM
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // Точка монтирования из index.html
);