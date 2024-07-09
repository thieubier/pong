import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';
import './css/WorkstationDetail.css';

const WorkstationDetail = () => {
    const { id } = useParams();
    const [workstation, setWorkstation] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWorkstation = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:3000/api/workstations/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log('Workstation details:', response.data);  // Log the workstation details
                setWorkstation(response.data);
            } catch (error) {
                setError('Erreur lors de la récupération des détails du poste de travail.');
                console.error('Error fetching workstation details:', error);
            }
        };

        fetchWorkstation();
    }, [id]);

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer ce poste de travail ?');
        if (confirmDelete) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:3000/api/workstations/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                toast.success('Poste de travail supprimé avec succès!');
                setTimeout(() => {
                    navigate('/workstations');
                }, 2000);
            } catch (error) {
                setError('Erreur lors de la suppression du poste de travail.');
                console.error('Error deleting workstation:', error);
            }
        }
    };

    if (error) {
        return <div className="workstation-detail-container"><p>{error}</p></div>;
    }

    if (!workstation) {
        return <div className="workstation-detail-container"><p>Chargement...</p></div>;
    }

    return (
        <div className="workstation-detail-page">
            <Link to="/workstations" className="workstation-detail-back-button">Retour</Link>
            <div className="workstation-detail-container">
                <h1 className="workstation-detail-title">Détails du Poste de Travail</h1>
                <p><strong>Nom:</strong> {workstation.name}</p>
                <p><strong>Description:</strong> {workstation.description}</p>

                {workstation.Machines && workstation.Machines.length > 0 ? (
                    <div className="workstation-detail-machines">
                        <h2>Machines</h2>
                        <ul>
                            {workstation.Machines.map(machine => (
                                <li key={machine.id}>{machine.name}</li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>Aucune machine associée</p>
                )}

                <button className="workstation-detail-delete-button" onClick={handleDelete}>
                    <FontAwesomeIcon icon={faTrash} /> Supprimer le Poste de Travail
                </button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default WorkstationDetail;
