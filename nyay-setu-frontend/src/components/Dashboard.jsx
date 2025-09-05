import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear the token
        navigate('/login'); // Redirect to login page
    };

    return (
        <div>
            <h2>Welcome to the Nyay-Setu Dashboard!</h2>

            {/* 2. Add this link */}
            <Link to="/create-case">File a New Case</Link>

            <br /><br />
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;