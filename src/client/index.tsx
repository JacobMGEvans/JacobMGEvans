import React from 'react';
import { createRoot } from 'react-dom/client';
import '../style.css';
import 'leaflet/dist/leaflet.css';
import App from './App';

const clientRoot = document.getElementById('client-root');
if (clientRoot) {
  createRoot(clientRoot).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
