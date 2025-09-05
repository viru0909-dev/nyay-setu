import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import evidenceService from '../services/evidenceService';
import userService from '../services/userService';
import caseService from '../services/caseService';
import { useAuth } from '../context/AuthContext';

const CaseDetailComponent = () => {
    const { user } = useAuth();
    const { caseId } = useParams();

    const [caseDetails, setCaseDetails] = useState(null);
    const [evidenceList, setEvidenceList] = useState([]);
    const [lawyers, setLawyers] = useState([]);
    const [selectedLawyerId, setSelectedLawyerId] = useState('');
    const [assignmentMessage, setAssignmentMessage] = useState('');
    const [error, setError] = useState('');

    const fetchCaseDetails = useCallback(async () => {
        try {
            const response = await caseService.getCaseById(caseId);
            setCaseDetails(response.data);
        } catch (err) {
            setError('Failed to fetch case details.');
        }
    }, [caseId]);

    useEffect(() => {
        fetchCaseDetails();

        evidenceService.getEvidenceForCase(caseId)
            .then(response => setEvidenceList(response.data))
            .catch(err => setError('Failed to fetch evidence.'));

        if (userHasRole('ROLE_JUDGE')) {
            userService.getAllLawyers()
                .then(response => setLawyers(response.data));
        }
    }, [caseId, fetchCaseDetails, user]); // Added user to dependency array

    const handleAssignLawyer = async () => {
        if (!selectedLawyerId) {
            setAssignmentMessage('Please select a lawyer.');
            return;
        }
        try {
            await caseService.assignLawyer(caseId, selectedLawyerId);
            setAssignmentMessage('Lawyer assigned successfully!');
            fetchCaseDetails();
        } catch (err) {
            setAssignmentMessage('Failed to assign lawyer.');
        }
    };

    const userHasRole = (roleToCheck) => {
        if (!user || !user.role) return false;
        return Array.isArray(user.role) ? user.role.includes(roleToCheck) : user.role === roleToCheck;
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

