import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import evidenceService from '../services/evidenceService.js';
import userService from '../services/userService.js';
import caseService from '../services/caseService.js';
import hearingService from '../services/hearingService.js';
import { useAuth } from '../context/AuthContext.js';

const CaseDetailComponent = () => {
    const { user } = useAuth();
    const { caseId } = useParams();

    const [caseDetails, setCaseDetails] = useState(null);
    const [evidenceList, setEvidenceList] = useState([]);
    const [lawyers, setLawyers] = useState([]);
    const [selectedLawyerId, setSelectedLawyerId] = useState('');
    const [assignmentMessage, setAssignmentMessage] = useState('');
    const [error, setError] = useState('');
    const [hearingForm, setHearingForm] = useState({ scheduledAt: '', meetingLink: '', notes: '' });
    const [hearingMessage, setHearingMessage] = useState('');
    const [hearings, setHearings] = useState([]); // <-- 1. ADD NEW STATE FOR HEARINGS

    // 2. This function will be called to refresh all data on the page
    const refreshData = useCallback(() => {
        caseService.getCaseById(caseId)
            .then(response => setCaseDetails(response.data))
            .catch(err => setError('Failed to fetch case details.'));

        evidenceService.getEvidenceForCase(caseId)
            .then(response => setEvidenceList(response.data))
            .catch(err => setError('Failed to fetch evidence.'));

        // Fetch hearings
        hearingService.getHearingsForCase(caseId)
            .then(response => setHearings(response.data))
            .catch(err => console.error("Failed to fetch hearings", err));
    }, [caseId]);

    const userHasRole = (roleToCheck) => {
        if (!user || !user.role) return false;
        return Array.isArray(user.role) ? user.role.includes(roleToCheck) : user.role === roleToCheck;
    };

    useEffect(() => {
        refreshData(); // Call the refresh function on component load

        if (userHasRole('ROLE_JUDGE')) {
            userService.getAllLawyers()
                .then(response => setLawyers(response.data));
        }
    }, [caseId, user, refreshData]);

    const handleAssignLawyer = async () => {
        // ... existing function ...
        try {
            await caseService.assignLawyer(caseId, selectedLawyerId);
            setAssignmentMessage('Lawyer assigned successfully!');
            refreshData(); // Refresh data after assigning
        } catch (err) {
            setAssignmentMessage('Failed to assign lawyer.');
        }
    };

    const handleHearingFormChange = (e) => {
        const { name, value } = e.target;
        setHearingForm(prevState => ({ ...prevState, [name]: value }));
    };

    const handleScheduleHearing = async (e) => {
        e.preventDefault();
        setHearingMessage('Scheduling...');
        try {
            const hearingData = { caseId: parseInt(caseId), ...hearingForm };
            await hearingService.scheduleHearing(hearingData);
            setHearingMessage('Hearing scheduled successfully!');
            setHearingForm({ scheduledAt: '', meetingLink: '', notes: '' });
            refreshData(); // <-- 3. REFRESH DATA AFTER SCHEDULING
        } catch (err) {
            setHearingMessage('Failed to schedule hearing. Please check the details and try again.');
            console.error(err);
        }
    };

    if (error) return <div className="container"><h2 className="error-message">{error}</h2></div>;
    if (!caseDetails) return <div className="container"><h2>Loading case details...</h2></div>;

    return (
        <div className="container">
            {/* ... all existing JSX for case details, assignment, scheduling ... */}

            <hr />

            {/* --- 4. NEW HEARINGS LIST SECTION --- */}
            <h3>Scheduled Hearings</h3>
            {hearings.length > 0 ? (
                <div className="hearings-list">
                    {hearings.map(hearing => (
                        <div key={hearing.id} className="info-box">
                            <h4>Hearing on: {new Date(hearing.scheduledAt).toLocaleString()}</h4>
                            <p><strong>Agenda/Notes:</strong> {hearing.notes || 'N/A'}</p>
                            <p><strong>Scheduled By:</strong> {hearing.scheduledByJudgeName}</p>
                            <a href={hearing.meetingLink} target="_blank" rel="noopener noreferrer">
                                <button>Join Hearing</button>
                            </a>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No hearings have been scheduled for this case yet.</p>
            )}

            <hr />

            <h3>Evidence Locker</h3>
            <Link to={`/cases/${caseId}/upload`}>
                <button style={{ marginBottom: '20px' }}>Upload New Evidence</button>
            </Link>

            {/* Existing Evidence Table */}
            {evidenceList.length > 0 ? (
                <table>
                    {/* ... table headers ... */}
                    <tbody>
                    {evidenceList.map(evidence => (
                        <tr key={evidence.id}>
                            <td>{evidence.fileName}</td>
                            <td>{evidence.fileType}</td>
                            <td>{new Date(evidence.uploadedAt).toLocaleString()}</td>
                            <td style={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>{evidence.sha256Hash}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>No evidence has been uploaded for this case yet.</p>
            )}
        </div>
    );
};