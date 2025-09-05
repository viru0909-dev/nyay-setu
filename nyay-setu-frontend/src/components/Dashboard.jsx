import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear the token
        navigate('/login'); // Redirect to login page
    };

    rreturn (
        <div>
            <h2>Welcome, {user ? user.email : 'User'}!</h2>
            <p>Your role is: {user ? user.role : 'Unknown'}</p>
            <nav>
                {/* 3. Add Conditional Links */}
                {user && user.role === 'ROLE_CLIENT' && (
                    <>
                        <Link to="/create-case" style={{ marginRight: '10px' }}>File a New Case</Link>
                        <Link to="/my-cases">View My Cases</Link>
                    </>
                )}

                {user && (user.role === 'ROLE_LAWYER' || user.role === 'ROLE_JUDGE') && (
                    <Link to="/cases">View All Cases</Link>
                )}
            </nav>

            <br /><br />
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;