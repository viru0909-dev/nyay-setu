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
            <Link to="/create-case" style={{ marginRight: '10px' }}>File a New Case</Link>
            <Link to="/my-cases">View My Cases</Link> {/* Add this link */}

            <br /><br />
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;