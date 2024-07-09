// frontend/src/components/QualificationList.js
import React, { useState, useEffect } from 'react';
import api from '../api';
import "./css/QualificationList.css"

const QualificationList = () => {
    const [qualifications, setQualifications] = useState([]);

    useEffect(() => {
        const fetchQualifications = async () => {
            try {
                const response = await api.get('/qualifications');
                setQualifications(response.data);
            } catch (error) {
                console.error('Error fetching qualifications:', error);
            }
        };

        fetchQualifications();
    }, []);

    return (
        <div>
            <h1>Qualifications</h1>
            <ul>
                {qualifications.map(qualification => (
                    <li key={qualification.id}>{qualification.id} - {qualification.date_qualified}</li>
                ))}
            </ul>
        </div>
    );
};

export default QualificationList;
