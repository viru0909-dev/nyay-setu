// src/services/caseService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/cases';

const getAllCases = () => {
    const token = localStorage.getItem('token');

    // If there's no token, the user is not logged in
    if (!token) {
        return Promise.reject("No token found");
    }

    // Send the token in the Authorization header
    return axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

const createCase = (description) => {
    const token = localStorage.getItem('token');
    return axios.post(API_URL, {description}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export default {
    getAllCases,
    createCase,
};