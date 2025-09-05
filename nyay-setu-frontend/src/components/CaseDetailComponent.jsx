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
    }, [caseId, fetchCaseDetails]);

    const handleAssignLawyer = async () => {
        if (!selectedLawyerId) {
            setAssignmentMessage('Please select a lawyer.');
            return;
        }
        try {
            await caseService.assignLawyer(caseId, selectedLawyerId);
            setAssignmentMessage('Lawyer assigned successfully!');
            fetchCaseDetails(); // Re-fetch case details to update the UI instantly
        } catch (err) {
            setAssignmentMessage('Failed to assign lawyer.');
        }
    };

    const userHasRole = (roleToCheck) => {
        if (!user || !user.role) return false;
        return Array.isArray(user.role) ? user.role.includes(roleToCheck) : user.role === roleToCheck;
    };

    if (error) return <div style={{ color: 'red' }}><h2>{error}</h2></div>;
    if (!caseDetails) return <div>Loading case details...</div>;

    return (
        <div>
            <h2>Case Details: {caseDetails.caseNumber}</h2>

            <div style={{ background: '#eee', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
                <h4>Case Information</h4>
                <p><strong>Client:</strong> {caseDetails.clientName}</p>
                <p><strong>Assigned Lawyer:</strong> {caseDetails.lawyerName}</p>
                <p><strong>Presiding Judge:</strong> {caseDetails.judgeName}</p>
                <p><strong>Status:</strong> {caseDetails.status}</p>
            </div>

            {userHasRole('ROLE_JUDGE') && caseDetails.lawyerName === 'Not Assigned' && (
                <div style={{ background: '#f0f0f0', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
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
            <Link to={`/cases/${caseId}/upload`}><button>Upload New Evidence</button></Link>

            {/* Evidence Table */}
            {/* ... existing evidence table code ... */}
        </div>
    );
};

export default CaseDetailComponent;