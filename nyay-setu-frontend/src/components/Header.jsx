import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import notificationService from '../services/notificationService';
import './Header.css'; // We will create this CSS file next

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);

    useEffect(() => {
        if (user) {
            notificationService.getMyNotifications()
                .then(response => {
                    setNotifications(response.data);
                })
                .catch(error => console.error("Failed to fetch notifications:", error));
        }
    }, [user]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const unreadCount = notifications.filter(n => !n.isRead).length;

    return (
        <header className="app-header">
            <Link to="/dashboard" className="logo">Nyay-Setu</Link>
            <nav>
                <div className="notification-bell" onClick={() => setShowNotifications(!showNotifications)}>
                    <span>🔔</span>
                    {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
                    {showNotifications && (
                        <div className="notification-dropdown">
                            {notifications.length > 0 ? (
                                notifications.map(n => (
                                    <div key={n.id} className="notification-item">
                                        <p>{n.message}</p>
                                        <small>{new Date(n.createdAt).toLocaleString()}</small>
                                    </div>
                                ))
                            ) : (
                                <div className="notification-item">No new notifications.</div>
                            )}
                        </div>
                    )}
                </div>
                <span className="user-info">Welcome, {user?.fullName || user?.email}</span>
                <button onClick={handleLogout} className="button-secondary">Logout</button>
            </nav>
        </header>
    );
};

export default Header;