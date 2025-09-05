// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

const register = (fullName, email, password, role) => {
    return axios.post(API_URL + 'register', {
        fullName,
        email,
        password,
        role,
    });
};

const login = (email, password) => {
    return axios.post(API_URL + 'login', {
        email,
        password,
    });
};

export default {
    register,
    login,
};