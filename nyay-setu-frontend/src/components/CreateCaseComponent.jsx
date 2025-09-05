import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import caseService from '../services/caseService';

const CreateCaseComponent = () => {
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleCreateCase = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            await caseService.createCase(description);
            setMessage('Case filed successfully! Redirecting to your cases...');
            // We don't have a "my cases" page yet, so we'll redirect to the dashboard
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setMessage(`Error: ${error.response.data.message}`);
            } else {
                setMessage('An error occurred while filing the case.');
            }
            console.error(error);
        }
    };

    return (
        <div>
            <h2>File a New Case</h2>
            <form onSubmit={handleCreateCase}>
                <div>
                    <label htmlFor="description">Case Description:</label>
                    <br />
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        minLength="20"
                        rows="10"
                        cols="50"
                        placeholder="Please provide a detailed description of your case (min. 20 characters)"
                    />
                </div>
                <button type="submit">Submit Case</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CreateCaseComponent;