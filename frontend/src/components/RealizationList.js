// frontend/src/components/RealizationList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/RealizationList.css';

const RealizationList = () => {
    const [realizations, setRealizations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRealizations = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3000/api/realizations', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setRealizations(response.data);
            } catch (error) {
                console.error('Error fetching realizations:', error);
                toast.error('Erreur lors de la récupération des réalisations');
            }
        };

        fetchRealizations();
    }, []);

    return (
        <div className="realization-list-container">
            <h1 className="realization-list-title">Liste des Réalisations</h1>
            <table className="realization-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Opération</th>
                    <th>Durée</th>
                    <th>Date</th>
                    <th>Utilisateur</th>
                    <th>Poste de travail</th>
                    <th>Machine</th>
                </tr>
                </thead>
                <tbody>
                {realizations.map(realization => (
                    <tr key={realization.id}>
                        <td>{realization.id}</td>
                        <td>{realization.Operation ? realization.Operation.name : 'N/A'}</td>
                        <td>{realization.duration}</td>
                        <td>{new Date(realization.date).toLocaleDateString()}</td>
                        <td>{realization.User ? realization.User.username : 'N/A'}</td>
                        <td>{realization.Workstation ? realization.Workstation.name : 'N/A'}</td>
                        <td>{realization.Machine ? realization.Machine.name : 'N/A'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <ToastContainer />
        </div>
    );
};

export default RealizationList;
