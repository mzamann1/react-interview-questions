import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './styles/select.css';
import App from './App';

// Get the root element
const rootElement = document.getElementById('root');

// Ensure the root element exists
if (!rootElement) {
  throw new Error('Root element not found. Make sure there is a div with id "root" in your HTML.');
}

// Create root and render app
const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);