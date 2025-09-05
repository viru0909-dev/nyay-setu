import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import evidenceService from '../services/evidenceService';

const CaseDetailComponent = () => {
    const [evidenceList, setEvidenceList] = useState([]);
    const [error, setError] = useState('');
    const { caseId } = useParams(); // Get caseId from the URL

    useEffect(() => {
        evidenceService.getEvidenceForCase(caseId)
            .then(response => {
                setEvidenceList(response.data);
            })
            .catch(err => {
                setError('Failed to fetch evidence for this case.');
                console.error(err);
            });
    }, [caseId]); // Re-run effect if caseId changes

    return (
        <div>
            <h2>Case Details for Case ID: {caseId}</h2>
            <hr />
            <h3>Evidence Locker</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <Link to={`/cases/${caseId}/upload`}>
                <button>Upload New Evidence</button>
            </Link>

            {evidenceList.length > 0 ? (
                <table border="1" cellPadding="5" style={{ marginTop: '20px' }}>
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
                            <td style={{ fontFamily: 'monospace' }}>{evidence.sha256Hash}</td>
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