import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import evidenceService from '../services/evidenceService';
import userService from '../services/userService';
import caseService from '../services/caseService';
import hearingService from '../services/hearingService';
import { useAuth } from '../context/AuthContext';

const CaseDetailComponent = () => {
    const { user } = useAuth();
    const { caseId } = useParams();

    // State for all data displayed on this page
    const [caseDetails, setCaseDetails] = useState(null);
    const [evidenceList, setEvidenceList] = useState([]);
    const [hearings, setHearings] = useState([]);
    const [lawyers, setLawyers] = useState([]);
    const [error, setError] = useState('');

    // State for the assignment form
    const [selectedLawyerId, setSelectedLawyerId] = useState('');
    const [assignmentMessage, setAssignmentMessage] = useState('');

    // State for the hearing form
    const [hearingForm, setHearingForm] = useState({ scheduledAt: '', meetingLink: '', notes: '' });
    const [hearingMessage, setHearingMessage] = useState('');

    // This single function will be used to refresh all data on the page
    const refreshData = useCallback(() => {
        caseService.getCaseById(caseId)
            .then(response => setCaseDetails(response.data))
            .catch(err => setError('Failed to fetch case details.'));

        evidenceService.getEvidenceForCase(caseId)
            .then(response => setEvidenceList(response.data))
            .catch(err => console.error('Failed to fetch evidence.', err));

        hearingService.getHearingsForCase(caseId)
            .then(response => setHearings(response.data))
            .catch(err => console.error("Failed to fetch hearings", err));
    }, [caseId]);

    const userHasRole = (roleToCheck) => {
        if (!user || !user.role) return false;
        return Array.isArray(user.role) ? user.role.includes(roleToCheck) : user.role === roleToCheck;
    };

    // Main effect to load data when the component mounts
    useEffect(() => {
        refreshData();
        if (userHasRole('ROLE_JUDGE')) {
            userService.getAllLawyers()
                .then(response => setLawyers(response.data));
        }
    }, [caseId, user, refreshData]);

    const handleAssignLawyer = async () => {
        if (!selectedLawyerId) {
            setAssignmentMessage('Please select a lawyer.');
            return;
        }
        try {
            await caseService.assignLawyer(caseId, selectedLawyerId);
            setAssignmentMessage('Lawyer assigned successfully!');
            refreshData(); // Refresh all data on the page
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
            refreshData(); // Refresh all data on the page
        } catch (err) {
            setHearingMessage('Failed to schedule hearing. Please check details.');
            console.error(err);
        }
    };

    if (error) return <div className="container"><h2 className="error-message">{error}</h2></div>;
    if (!caseDetails) return <div className="container"><h2>Loading case details...</h2></div>;

    return (
        <div className="container">
            <h2>Case Details: {caseDetails.caseNumber}</h2>

            <div className="info-box">
                <h4>Case Information</h4>
                <p><strong>Client:</strong> {caseDetails.clientName}</p>
                <p><strong>Assigned Lawyer:</strong> {caseDetails.lawyerName}</p>
                <p><strong>Presiding Judge:</strong> {caseDetails.judgeName}</p>
                <p><strong>Status:</strong> {caseDetails.status}</p>
            </div>

            {userHasRole('ROLE_JUDGE') && caseDetails.lawyerName === 'Not Assigned' && (
                <div className="info-box" style={{borderColor: 'var(--primary-color)'}}>
                    <h4>Assign Lawyer to this Case</h4>
                    <select onChange={(e) => setSelectedLawyerId(e.target.value)}>
                        <option value="">-- Select a Lawyer --</option>
                        {lawyers.map(lawyer => (
                            <option key={lawyer.id} value={lawyer.id}>{lawyer.fullName}</option>
                        ))}
                    </select>
                    <button onClick={handleAssignLawyer} style={{ marginLeft: '10px' }}>Assign Lawyer</button>
                    {assignmentMessage && <p>{assignmentMessage}</p>}
                </div>
            )}

            {userHasRole('ROLE_JUDGE') && (
                <div className="info-box" style={{borderColor: 'var(--secondary-color)'}}>
                    <h4>Schedule a New Hearing</h4>
                    <form onSubmit={handleScheduleHearing}>
                        <div>
                            <label htmlFor="scheduledAt">Date and Time</label>
                            <input
                                type="datetime-local"
                                id="scheduledAt"
                                name="scheduledAt"
                                value={hearingForm.scheduledAt}
                                onChange={handleHearingFormChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="meetingLink">Meeting Link (e.g., Google Meet, Jitsi)</label>
                            <input
                                type="url"
                                id="meetingLink"
                                name="meetingLink"
                                value={hearingForm.meetingLink}
                                onChange={handleHearingFormChange}
                                placeholder="https://meet.google.com/xyz-abc-def"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="notes">Agenda / Notes (Optional)</label>
                            <textarea
                                id="notes"
                                name="notes"
                                value={hearingForm.notes}
                                onChange={handleHearingFormChange}
                                rows="3"
                            />
                        </div>
                        <button type="submit">Schedule Hearing</button>
                    </form>
                    {hearingMessage && <p>{hearingMessage}</p>}
                </div>
            )}

            <hr />

            <h3>Scheduled Hearings</h3>
            {hearings.length > 0 ? (
                <div className="hearings-list">
                    {hearings.map(hearing => (
                        <div key={hearing.id} className="info-box">
                            <h4>Hearing on: {new Date(hearing.scheduledAt).toLocaleString()}</h4>
                            <p><strong>Agenda/Notes:</strong> {hearing.notes || 'N/A'}</p>
                            <p><strong>Scheduled By:</strong> {hearing.scheduledByJudgeName}</p>
                            <Link to={`/hearings/${hearing.id}`}>
                                <button>View Courtroom</button>
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No hearings have been scheduled for this case yet.</p>
            )}

            <hr />

            <h3>Evidence Locker</h3>
            <Link to={`/cases/${caseId}/upload`}>
                <button style={{marginBottom: '20px'}}>Upload New Evidence</button>
            </Link>

            {evidenceList.length > 0 ? (
                <table>
                    <thead>
                    <tr>
                        <th>File Name</th>
                        <th>File Type</th>
                        <th>Uploaded At</th>
                        <th>SHA-256 Hash</th>
                    </tr>
                    </thead>
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

export default CaseDetailComponent;