import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import './App.css';
import { TimerProvider } from './pages/TimerContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
    <TimerProvider>
      <App />
    </TimerProvider>
    </Router>
  </React.StrictMode>
);

