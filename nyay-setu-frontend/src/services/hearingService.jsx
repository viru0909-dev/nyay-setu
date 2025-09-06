import axios from 'axios';

const API_URL = 'http://localhost:8080/api/hearings';

const scheduleHearing = (hearingData) => {
    const token = localStorage.getItem('token');
    // The hearingData object will contain: { caseId, scheduledAt, meetingLink, notes }
    return axios.post(`${API_URL}/schedule`, hearingData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

const getHearingsForCase = (caseId) => {
    const token = localStorage.getItem('token');
    return axios.get(`${API_URL}/by-case/${caseId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

const getHearingById = (hearingId) => {
    const token = localStorage.getItem('token');
    return axios.get(`${API_URL}/${hearingId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export default {
    scheduleHearing,
    getHearingsForCase,
    getHearingById,
};