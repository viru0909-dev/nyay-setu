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

const getMyCases = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return Promise.reject("No token found");
    }

    // Call the new endpoint
    return axios.get(`${API_URL}/my-cases`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

const assignLawyer = (caseId, lawyerId) => {
    const token = localStorage.getItem('token');
    return axios.put(`${API_URL}/${caseId}/assign-lawyer`, { lawyerId }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

const getCaseById = (caseId) => {
    const token = localStorage.getItem('token');
    return axios.get(`${API_URL}/${caseId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export default {
    getAllCases,
    createCase,
    getMyCases,
    assignLawyer,
    getCaseById,
};