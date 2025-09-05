import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users';

const getAllLawyers = () => {
    const token = localStorage.getItem('token');
    return axios.get(`${API_URL}/lawyers`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export default {
    getAllLawyers,
};