// frontend/src/components/QuotationList.js
import React, { useState, useEffect } from 'react';
import api from '../api';
import './css/QuotationList.css';

const QuotationList = () => {
    const [quotations, setQuotations] = useState([]);

    useEffect(() => {
        const fetchQuotations = async () => {
            try {
                const response = await api.get('/quotations');
                setQuotations(response.data);
            } catch (error) {
                console.error('Error fetching quotations:', error);
            }
        };

        fetchQuotations();
    }, []);

    return (
        <div className="quotation-list-container">
            <h1>Quotations</h1>
            <ul className="quotation-list">
                {quotations.map(quotation => (
                    <li key={quotation.id} className="quotation-item">
                        <span>{quotation.id}</span> - <span>{quotation.quotation_date}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuotationList;
