import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './context/AuthContext'; // 1. Import

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider> {/* 2. Wrap the App */}
            <App />
        </AuthProvider>
    </React.StrictMode>,
)
