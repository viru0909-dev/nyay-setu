// src/App.jsx

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Dashboard from './components/Dashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import CaseListComponent from './components/CaseListComponent.jsx';
import CreateCaseComponent from './components/CreateCaseComponent.jsx';
import EvidenceUploadComponent from './components/EvidenceUploadComponent.jsx';
import MyCasesComponent from './components/MyCasesComponent.jsx';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />


                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/cases" element={<CaseListComponent />} />
                    <Route path="/create-case" element={<CreateCaseComponent />} />
                    <Route path="/cases/:caseId/upload" element={<EvidenceUploadComponent />} />
                    <Route path="/my-cases" element={<MyCasesComponent />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;