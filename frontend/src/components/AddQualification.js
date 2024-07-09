// frontend/src/components/AddQualification.js
import React, { useState } from 'react';
import api from '../api';

const AddQualification = () => {
    const [dateQualified, setDateQualified] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/qualifications', {
                date_qualified: dateQualified,
            });
            alert('Qualification added successfully');
        } catch (error) {
            console.error('Error adding qualification:', error);
            alert('Failed to add qualification');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Date Qualified</label>
                <input type="date" value={dateQualified} onChange={(e) => setDateQualified(e.target.value)} />
            </div>
            <button type="submit">Add Qualification</button>
        </form>
    );
};

export default AddQualification;
