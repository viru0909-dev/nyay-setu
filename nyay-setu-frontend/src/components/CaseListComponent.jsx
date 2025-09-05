import React, { useState, useEffect } from 'react';
import caseService from '../services/caseService';
import { Link } from 'react-router-dom';

const CaseListComponent = () => {
    const [cases, setCases] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        caseService.getAllCases()
            .then(response => {
                setCases(response.data);
            })
            .catch(err => {
                // This error will trigger if the user's role is not LAWYER or JUDGE
                if (err.response && err.response.status === 403) {
                    setError('Access Denied: You do not have permission to view this page.');
                } else {
                    setError('Failed to fetch cases.');
                }
                console.error(err);
            });
    }, []); // The empty array means this effect runs only once when the component mounts

    if (error) {
        return <div style={{ color: 'red' }}><h2>{error}</h2></div>;
    }

    return (
        <div>
            <h2>Case List</h2>
            <table border="1" cellPadding="5">
                <thead>
                <tr>
                    <th>Case ID</th>
                    <th>Case Number</th>
                    <th>Client Name</th>
                    <th>Status</th>
                    <th>Actions</th> {/* 2. Add Actions header */}
                </tr>
                </thead>
                <tbody>
                {cases.map(caseItem => (
                    <tr key={caseItem.id}>
                        <td>{caseItem.id}</td>
                        <td>{caseItem.caseNumber}</td>
                        <td>{caseItem.clientName}</td>
                        <td>{caseItem.status}</td>
                        <td>
                            {/* 3. Add the Link/Button */}
                            <Link to={`/cases/${caseItem.id}/upload`}>
                                <button>Upload Evidence</button>
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CaseListComponent;