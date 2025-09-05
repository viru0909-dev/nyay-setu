import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // This function safely checks for roles, whether it's a string or an array
    const userHasRole = (roleToCheck) => {
        if (!user || !user.role) {
            return false;
        }
        if (Array.isArray(user.role)) {
            return user.role.includes(roleToCheck);
        }
        return user.role === roleToCheck;
    };

    // Helper function to format the role for display
    const formatRole = (role) => {
        if (!role) return 'Unknown';
        // Handles both string and array, removes "ROLE_" prefix, and capitalizes
        const roleString = Array.isArray(role) ? role[0] : role;
        const formatted = roleString.replace('ROLE_', '');
        return formatted.charAt(0).toUpperCase() + formatted.slice(1).toLowerCase();
    };

    return (
        <div>
            {/* Display full name if it exists, otherwise the email */}
            <h2>Welcome, {user && user.fullName ? user.fullName : (user ? user.email : 'User')}!</h2>

            {/* Display the formatted role */}
            {user && <p>Your role is: <strong>{formatRole(user.role)}</strong></p>}

            <nav style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                {/* Conditional Links for CLIENT */}
                {userHasRole('ROLE_CLIENT') && (
                    <>
                        <Link to="/create-case">File a New Case</Link>
                        <Link to="/my-cases">View My Cases</Link>
                    </>
                )}

                {/* Conditional Links for LAWYER or JUDGE */}
                {(userHasRole('ROLE_LAWYER') || userHasRole('ROLE_JUDGE')) && (
                    <Link to="/cases">View All Cases</Link>
                )}
            </nav>

            <div style={{ marginTop: '40px' }}>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default Dashboard;

