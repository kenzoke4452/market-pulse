// frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Установите через npm install react-router-dom
import Home from './pages/Home'; // Импорт главной страницы
import UpcomingEvents from './pages/UpcomingEvents'; // Импорт страницы событий
import About from './pages/About'; // Импорт страницы About
import './styles/styles.css'; // Импорт глобальных стилей

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          {/* Роут для главной страницы */}
          <Route path="/" exact component={Home} />
          {/* Роут для предстоящих событий */}
          <Route path="/events" component={UpcomingEvents} />
          {/* Роут для страницы About */}
          <Route path="/about" component={About} />
          {/* Можно добавить роут для 404: <Route component={NotFound} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
