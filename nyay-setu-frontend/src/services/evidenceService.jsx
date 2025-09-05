// src/services/evidenceService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/evidence';

const uploadEvidence = (file, caseId) => {
    const token = localStorage.getItem('token');

    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('file', file);
    formData.append('caseId', caseId);

    return axios.post(`${API_URL}/upload`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data', // Important for file uploads
        },
    });
};

export default {
    uploadEvidence,
};