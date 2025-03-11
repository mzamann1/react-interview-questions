import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

// Get the root element
const rootElement = document.getElementById('root');

// Ensure the root element exists
if (!rootElement) {
  throw new Error('Root element not found. Make sure there is a div with id "root" in your HTML.');
}

// Create a root
const root = createRoot(rootElement);

// Render the app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
