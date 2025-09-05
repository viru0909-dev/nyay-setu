// src/App.js
// src/App.jsx

// Step 1: Import Navigate
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Dashboard from './components/Dashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import CaseListComponent from './components/CaseListComponent.jsx';

function App() {
    return (
        <Router>
            <Routes>
                {/* Step 2: Add this new route for the home page */}
                <Route path="/" element={<Navigate to="/login" />} />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    {/* Add other protected routes here */}
                </Route>
                <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/cases" element={<CaseListComponent />} /> {/* 2. Add the new route */}
            </Route>
            </Routes>
        </Router>
    );
}

export default App;