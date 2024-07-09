// frontend/src/components/WorkstationList.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/WorkstationList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEye, faSync } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WorkstationList = () => {
    const [workstations, setWorkstations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchWorkstations();
    }, []);

    const fetchWorkstations = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3000/api/workstations', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setWorkstations(response.data);
        } catch (error) {
            console.error('Error fetching workstations:', error);
        }
    };

    const handleDelete = async (id) => {
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
                fetchWorkstations();
            } catch (error) {
                console.error('Error deleting workstation:', error);
            }
        }
    };

    return (
        <div className="workstation-list-background">
            <div className="workstation-list-container">
                <h1 className="workstation-list-title">Liste des Postes de Travail</h1>
                <div className="button-container">
                    <button onClick={fetchWorkstations} className="refresh-button">
                        <FontAwesomeIcon icon={faSync} />
                    </button>
                    <Link to="/workstations/add" className="add-workstation-button">Ajouter un nouveau poste</Link>
                </div>
                <table className="workstation-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {workstations.map(workstation => (
                        <tr key={workstation.id}>
                            <td>{workstation.id}</td>
                            <td>{workstation.name}</td>
                            <td className="actions">
                                <button
                                    onClick={() => navigate(`/workstations/${workstation.id}`)}
                                    className="detail-button"
                                >
                                    <FontAwesomeIcon icon={faEye} />
                                </button>
                                <button
                                    onClick={() => handleDelete(workstation.id)}
                                    className="delete-button"
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <ToastContainer />
        </div>
    );
};

export default WorkstationList;
