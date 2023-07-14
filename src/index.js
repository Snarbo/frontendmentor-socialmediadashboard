import React from 'react';
import ReactDOM from 'react-dom/client';
import './tailwind.css';
import './index.css';
import App from './App';
import { ContextProvider } from './store/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ContextProvider>
    <App />
  </ContextProvider>
);
