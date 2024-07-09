import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';
import './css/MachineDetail.css';

const MachineDetail = () => {
    const { id } = useParams();
    const [machine, setMachine] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMachine = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:3000/api/machines/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log('Machine details:', response.data);  // Log the machine details
                setMachine(response.data);
            } catch (error) {
                setError('Erreur lors de la récupération des détails de la machine.');
                console.error('Error fetching machine details:', error);
            }
        };

        fetchMachine();
    }, [id]);

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer cette machine ?');
        if (confirmDelete) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:3000/api/machines/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                toast.success('Machine supprimée avec succès!');
                setTimeout(() => {
                    navigate('/machines');
                }, 2000);
            } catch (error) {
                setError('Erreur lors de la suppression de la machine.');
                console.error('Error deleting machine:', error);
            }
        }
    };

    if (error) {
        return <div className="machine-detail-container"><p>{error}</p></div>;
    }

    if (!machine) {
        return <div className="machine-detail-container"><p>Chargement...</p></div>;
    }

    return (
        <div className="machine-detail-page">
            <Link to="/machines" className="machine-detail-back-button">Retour</Link>
            <div className="machine-detail-container">
                <h1 className="machine-detail-title">Détails de la Machine</h1>
                <p><strong>Nom:</strong> {machine.name}</p>
                <p><strong>Description:</strong> {machine.description}</p>

                {machine.Workstations && machine.Workstations.length > 0 && (
                    <div className="machine-detail-workstations">
                        <h2>Postes de Travail Associés</h2>
                        <table>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nom</th>
                                <th>Description</th>
                            </tr>
                            </thead>
                            <tbody>
                            {machine.Workstations.map(workstation => (
                                <tr key={workstation.id}>
                                    <td>{workstation.id}</td>
                                    <td>{workstation.name}</td>
                                    <td>{workstation.description}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
                <button className="machine-detail-edit-button" onClick={() => navigate(`/machines/edit/${machine.id}`)}>
                    <FontAwesomeIcon icon={faEdit} /> Modifier la Machine
                </button>
                <button className="machine-detail-delete-button" onClick={handleDelete}>
                    <FontAwesomeIcon icon={faTrash} /> Supprimer la Machine
                </button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default MachineDetail;
