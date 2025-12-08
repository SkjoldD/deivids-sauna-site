import * as React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css';

console.log('React app starting...');
const rootElement = document.getElementById('root');
console.log('Root element found:', rootElement);

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  console.log('Creating React root...');
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('React app rendered!');
} else {
  console.error('Root element not found!');
}
