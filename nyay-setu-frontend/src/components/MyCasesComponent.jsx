import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import caseService from '../services/caseService';

const MyCasesComponent = () => {
    const [myCases, setMyCases] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        caseService.getMyCases()
            .then(response => {
                setMyCases(response.data);
            })
            .catch(err => {
                setError('Failed to fetch your cases. Please try again later.');
                console.error(err);
            });
    }, []);

    if (error) {
        return <div style={{ color: 'red' }}><h2>{error}</h2></div>;
    }

    if (myCases.length === 0) {
        return <div><h2>My Cases</h2><p>You have not filed any cases yet.</p></div>
    }

    return (
        <div>
            <h2>My Cases</h2>
            <table border="1" cellPadding="5">
                <thead>
                <tr>
                    <th>Case Number</th>
                    <th>Status</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {myCases.map(caseItem => (
                    <tr key={caseItem.id}>
                        <td>{caseItem.caseNumber}</td>
                        <td>{caseItem.status}</td>
                        <td>{caseItem.description}</td>
                        <td>
                            <Link to={`/cases/${caseItem.id}`}>
                                <button>View Details</button>
                            </Link>
                        </td>
                    </tr>
                ))}

                </tbody>
            </table>
        </div>
    );
};

export default MyCasesComponent;