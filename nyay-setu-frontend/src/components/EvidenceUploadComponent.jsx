import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import evidenceService from '../services/evidenceService';

const EvidenceUploadComponent = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState('');
    const { caseId } = useParams(); // Get caseId from the URL

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setMessage('Please select a file first.');
            return;
        }
        setMessage('Uploading...');
        try {
            const response = await evidenceService.uploadEvidence(selectedFile, caseId);
            setMessage(`Upload successful! File hash: ${response.data.sha256Hash}`);
        } catch (error) {
            setMessage('Upload failed. Please try again.');
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Upload Evidence for Case ID: {caseId}</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default EvidenceUploadComponent;