import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/ManufacturingRangeList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEye, faSync, faEdit, faCog } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManufacturingRangeList = () => {
    const [ranges, setRanges] = useState([]);
    const [userId, setUserId] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                setUserId(decodedToken.userId);
                setUserRole(decodedToken.role);
            }
        };

        fetchUser();
        fetchRanges();
    }, []);

    const fetchRanges = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/manufacturing-ranges', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setRanges(response.data);
        } catch (error) {
            console.error('Error fetching manufacturing ranges:', error);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer cette gamme de fabrication ?');
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:3000/api/manufacturing-ranges/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                toast.success('Gamme de fabrication supprimée avec succès!');
                fetchRanges();
            } catch (error) {
                console.error('Error deleting manufacturing range:', error);
            }
        }
    };

    return (
        <div className="manufacturing-range-list-background">
            <div className="manufacturing-range-list-container">
                <h1 className="manufacturing-range-list-title">Liste des Gammes de Fabrication</h1>
                <div className="button-container">
                    <button onClick={fetchRanges} className="refresh-button">
                        <FontAwesomeIcon icon={faSync} />
                    </button>
                    {(userRole === 'range_creator' || userRole === 'admin') && (
                        <Link to="/manufacturing-ranges/add" className="add-manufacturing-range-button">Créer une nouvelle gamme</Link>
                    )}
                </div>
                <table className="manufacturing-range-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Pièce</th>
                        <th>Superviseur</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {ranges.map(range => (
                        <tr key={range.id}>
                            <td>{range.id}</td>
                            <td>{range.Piece ? range.Piece.label : 'N/A'}</td>
                            <td>{range.Supervisor ? range.Supervisor.username : 'N/A'}</td>
                            <td className="actions">
                                <button
                                    onClick={() => navigate(`/manufacturing-ranges/${range.id}`)}
                                    className="detail-button"
                                >
                                    <FontAwesomeIcon icon={faEye} />
                                </button>
                                {(userRole === 'admin' || range.supervisor_id === userId) && (
                                    <button
                                        onClick={() => navigate(`/manufacturing-ranges/edit/${range.id}`)}
                                        className="edit-button"
                                    >
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                )}
                                <button
                                    onClick={() => navigate(`/manufacturing-ranges/fabricate/${range.id}`)}
                                    className="fabricate-button"
                                >
                                    <FontAwesomeIcon icon={faCog} />
                                </button>
                                {userRole === 'admin' && (
                                    <button
                                        onClick={() => handleDelete(range.id)}
                                        className="delete-button"
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                )}
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

export default ManufacturingRangeList;
