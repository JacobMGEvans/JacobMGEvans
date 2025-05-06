import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import '../style.css';

const clientRoot = document.getElementById('client-root');
if (clientRoot) {
  createRoot(clientRoot).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
