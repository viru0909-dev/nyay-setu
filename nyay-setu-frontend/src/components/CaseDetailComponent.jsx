import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import evidenceService from '../services/evidenceService';
import userService from '../services/userService'; // Import the new user service
import caseService from '../services/caseService'; // Import the case service for assignment
import { useAuth } from '../context/AuthContext'; // Import useAuth to check the user's role

const CaseDetailComponent = () => {
    const { user } = useAuth(); // Get the current user
    const [evidenceList, setEvidenceList] = useState([]);
    const [error, setError] = useState('');
    const { caseId } = useParams();

    // New state for the assignment feature
    const [lawyers, setLawyers] = useState([]);
    const [selectedLawyerId, setSelectedLawyerId] = useState('');
    const [assignmentMessage, setAssignmentMessage] = useState('');

    // This function safely checks for the user's role
    const userHasRole = (roleToCheck) => {
        if (!user || !user.role) return false;
        if (Array.isArray(user.role)) return user.role.includes(roleToCheck);
        return user.role === roleToCheck;
    };

    // Fetch evidence and lawyers (if the user is a judge)
    useEffect(() => {
        evidenceService.getEvidenceForCase(caseId)
            .then(response => setEvidenceList(response.data))
            .catch(err => setError('Failed to fetch evidence.'));

        // Only fetch the list of lawyers if the current user is a judge
        if (userHasRole('ROLE_JUDGE')) {
            userService.getAllLawyers()
                .then(response => {
                    setLawyers(response.data);
                    if (response.data.length > 0) {
                        setSelectedLawyerId(response.data[0].id); // Default to the first lawyer
                    }
                })
                .catch(err => console.error("Failed to fetch lawyers", err));
        }
    }, [caseId, user]); // Re-run if caseId or user changes

    // Handler for the assignment button
    const handleAssignLawyer = async () => {
        if (!selectedLawyerId) {
            setAssignmentMessage('Please select a lawyer.');
            return;
        }
        setAssignmentMessage('Assigning...');
        try {
            await caseService.assignLawyer(caseId, selectedLawyerId);
            setAssignmentMessage('Lawyer assigned successfully!');
        } catch (err) {
            setAssignmentMessage('Failed to assign lawyer. Please try again.');
            console.error(err);
        }
    };

    return (
        <div>
            <h2>Case Details for Case ID: {caseId}</h2>

            {/* --- Assignment Section (for Judges only) --- */}
            {userHasRole('ROLE_JUDGE') && (
                <div style={{ background: '#f0f0f0', padding: '15px', margin: '20px 0', borderRadius: '8px' }}>
                    <h4>Assign Lawyer to this Case</h4>
                    <select value={selectedLawyerId} onChange={(e) => setSelectedLawyerId(e.target.value)}>
                        {lawyers.map(lawyer => (
                            <option key={lawyer.id} value={lawyer.id}>
                                {lawyer.fullName} (ID: {lawyer.id})
                            </option>
                        ))}
                    </select>
                    <button onClick={handleAssignLawyer} style={{ marginLeft: '10px' }}>Assign Lawyer</button>
                    {assignmentMessage && <p>{assignmentMessage}</p>}
                </div>
            )}

            <hr />
            <h3>Evidence Locker</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Link to={`/cases/${caseId}/upload`}><button>Upload New Evidence</button></Link>

            {/* The rest of the evidence table code remains the same... */}
            {evidenceList.length > 0 ? (
                <table border="1" cellPadding="5" style={{ marginTop: '20px', width: '100%' }}>
                    <thead>
                    <tr>
                        <th>File Name</th>
                        <th>File Type</th>
                        <th>Uploaded At</th>
                        <th>SHA-256 Hash (Integrity Check)</th>
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
                <p style={{ marginTop: '20px' }}>No evidence has been uploaded for this case yet.</p>
            )}
        </div>
    );
};

export default CaseDetailComponent;