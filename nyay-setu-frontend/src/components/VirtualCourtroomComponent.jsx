
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import hearingService from '../services/hearingService';

const VirtualCourtroomComponent = () => {
    const [hearingDetails, setHearingDetails] = useState(null);
    const [error, setError] = useState('');
    const { hearingId } = useParams();

    useEffect(() => {
        hearingService.getHearingById(hearingId)
            .then(response => {
                setHearingDetails(response.data);
            })
            .catch(err => {
                setError('Could not load hearing details. The hearing may not exist or you may not have permission.');
                console.error(err);
            });
    }, [hearingId]);

    if (error) return <div className="container"><h2 className="error-message">{error}</h2></div>;
    if (!hearingDetails) return <div className="container"><h2>Loading Virtual Courtroom...</h2></div>;

    return (
        <div className="container">
            <h2>Virtual Courtroom</h2>
            <div className="info-box">
                <h4>Hearing Scheduled for: {new Date(hearingDetails.scheduledAt).toLocaleString()}</h4>
                <p><strong>Scheduled By:</strong> {hearingDetails.scheduledByJudgeName}</p>
                <p><strong>Agenda / Notes:</strong> {hearingDetails.notes || 'No specific agenda provided.'}</p>
            </div>

            <div style={{ textAlign: 'center', marginTop: '40px' }}>
                <a href={hearingDetails.meetingLink} target="_blank" rel="noopener noreferrer" className="join-hearing-button">
                    Join Hearing Now
                </a>
                <p style={{ marginTop: '10px', fontSize: '0.9rem', color: 'var(--text-secondary)'}}>
                    (This will open the meeting link in a new tab)
                </p>
            </div>
        </div>
    );
};

export default VirtualCourtroomComponent;