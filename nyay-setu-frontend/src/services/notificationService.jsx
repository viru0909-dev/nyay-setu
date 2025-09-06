import axios from 'axios';

const API_URL = 'http://localhost:8080/api/notifications';

const getMyNotifications = () => {
    const token = localStorage.getItem('token');
    return axios.get(`${API_URL}/my-notifications`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export default {
    getMyNotifications,
};