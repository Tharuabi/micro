import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css'; // Ensure global styles are loaded

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
    <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>,
);
