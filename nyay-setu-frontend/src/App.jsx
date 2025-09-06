// in App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import CaseListComponent from './components/CaseListComponent';
import CreateCaseComponent from './components/CreateCaseComponent';
import MyCasesComponent from './components/MyCasesComponent';
import EvidenceUploadComponent from './components/EvidenceUploadComponent';
import CaseDetailComponent from './components/CaseDetailComponent';
import VirtualCourtroomComponent from './components/VirtualCourtroomComponent';
import MainLayout from './components/MainLayout.jsx'; // 1. Import the layout

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* All protected routes will now go through MainLayout */}
                <Route element={<ProtectedRoute />}>
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<Navigate to="/dashboard" />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/create-case" element={<CreateCaseComponent />} />
                        <Route path="/my-cases" element={<MyCasesComponent />} />
                        <Route path="/cases" element={<CaseListComponent />} />
                        <Route path="/cases/:caseId" element={<CaseDetailComponent />} />
                        <Route path="/cases/:caseId/upload" element={<EvidenceUploadComponent />} />
                        <Route path="/hearings/:hearingId" element={<VirtualCourtroomComponent />} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;