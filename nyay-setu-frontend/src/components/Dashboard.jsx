import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear the token
        navigate('/login'); // Redirect to login page
    };

    return (
        <div>
            <h2>Welcome to the Nyay-Setu Dashboard!</h2>
            <p>This is a protected area only for logged-in users.</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;