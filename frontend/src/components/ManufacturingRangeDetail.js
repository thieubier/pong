import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';
import './css/ManufacturingRangeDetail.css';

const ManufacturingRangeDetail = () => {
    const { id } = useParams();
    const [range, setRange] = useState(null);
    const [error, setError] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const token = localStorage.getItem('token');
                const response =
                    await axios.get('http://localhost:3000/api/users/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log('Current user:', response.data);
                setCurrentUser(response.data);
            } catch (error) {
                console.error('Error fetching current user:', error);
            }
        };

        const fetchRange = async () => {
            try {
                const token = localStorage.getItem('token');
                const response =
                    await axios.get(`http://localhost:3000/api/manufacturing-ranges/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log('Manufacturing range details:', response.data);
                setRange(response.data);
            } catch (error) {
                setError('Erreur lors de la récupération des détails de la gamme de fabrication.');
                console.error('Error fetching range details:', error);
            }
        };

        fetchCurrentUser();
        fetchRange();
    }, [id]);

    const handleDelete = async () => {
        const confirmDelete =
            window.confirm('Êtes-vous sûr de vouloir supprimer cette gamme de fabrication ?');
        if (confirmDelete) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:3000/api/manufacturing-ranges/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                toast.success('Gamme de fabrication supprimée avec succès!');
                setTimeout(() => {
                    navigate('/manufacturing-ranges');
                }, 2000);
            } catch (error) {
                setError('Erreur lors de la suppression de la gamme de fabrication.');
                console.error('Error deleting range:', error);
            }
        }
    };

    if (error) {
        return <div className="manufacturing-range-detail-container"><p>{error}</p></div>;
    }

    if (!range || !currentUser) {
        return <div className="manufacturing-range-detail-container"><p>Chargement...</p></div>;
    }

    return (
        <div className="manufacturing-range-detail-page">
            <Link to="/manufacturing-ranges" className="manufacturing-range-detail-back-button">Retour</Link>
            <div className="manufacturing-range-detail-container">
                <h1 className="manufacturing-range-detail-title">Détails de la Gamme de Fabrication</h1>
                <p><strong>Nom:</strong> {range.name}</p>
                <p><strong>Superviseur:</strong> {range.Supervisor.username}</p>
                <p><strong>Pièce:</strong> {range.Piece.label}</p>

                {range.Operations && range.Operations.length > 0 && (
                    <div className="manufacturing-range-detail-operations">
                        <h2>Opérations</h2>
                        <table>
                            <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Durée</th>
                            </tr>
                            </thead>
                            <tbody>
                            {range.Operations.map(operation => (
                                <tr key={operation.id}>
                                    <td>{operation.name}</td>
                                    <td>{operation.ManufacturingRangeOperations.duration}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {currentUser && currentUser.id === range.supervisor_id && (
                    <button className="manufacturing-range-detail-delete-button" onClick={handleDelete}>
                        <FontAwesomeIcon icon={faTrash} /> Supprimer la Gamme
                    </button>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default ManufacturingRangeDetail;
