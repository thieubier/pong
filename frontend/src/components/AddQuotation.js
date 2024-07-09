// frontend/src/components/AddQuotation.js
import React, { useState } from 'react';
import api from '../api';

const AddQuotation = () => {
    const [quotationDate, setQuotationDate] = useState('');
    const [expiryDate, setExpiryDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/quotations', {
                quotation_date: quotationDate,
                expiry_date: expiryDate,
            });
            alert('Quotation added successfully');
        } catch (error) {
            console.error('Error adding quotation:', error);
            alert('Failed to add quotation');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Quotation Date</label>
                <input type="date" value={quotationDate} onChange={(e) => setQuotationDate(e.target.value)} />
            </div>
            <div>
                <label>Expiry Date</label>
                <input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
            </div>
            <button type="submit">Add Quotation</button>
        </form>
    );
};

export default AddQuotation;
