import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import '../style.css';

if (typeof window !== 'undefined') {
  const clientRoot = document.getElementById('client-root');
  if (clientRoot) {
    createRoot(clientRoot).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
}
