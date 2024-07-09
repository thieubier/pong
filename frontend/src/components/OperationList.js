import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/OperationList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEye, faSync } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OperationList = () => {
    const [operations, setOperations] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userRole = localStorage.getItem('userRole');
        setIsAdmin(userRole === 'admin');

        fetchOperations();
    }, []);

    const fetchOperations = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/operations');
            setOperations(response.data);
        } catch (error) {
            console.error('Error fetching operations:', error);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer cette opération ?');
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:3000/api/operations/${id}`);
                toast.success('Opération supprimée avec succès!');
                fetchOperations();
            } catch (error) {
                console.error('Error deleting operation:', error);
            }
        }
    };

    return (
        <div className="operation-list-background">
            <div className="operation-list-container">
                <h1 className="operation-list-title">Liste des Opérations</h1>
                <div className="button-container">
                    <button onClick={fetchOperations} className="refresh-button">
                        <FontAwesomeIcon icon={faSync} />
                    </button>
                    <Link to="/operations/add" className="add-operation-button">Créer une nouvelle opération</Link>
                </div>
                <table className="operation-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Durée</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {operations.map(operation => (
                        <tr key={operation.id}>
                            <td>{operation.id}</td>
                            <td>{operation.name}</td>
                            <td>{operation.duration} minutes</td>
                            <td className="actions">
                                <button
                                    onClick={() => navigate(`/operations/${operation.id}`)}
                                    className="detail-button"
                                >
                                    <FontAwesomeIcon icon={faEye} />
                                </button>
                                {isAdmin && (
                                    <button
                                        onClick={() => handleDelete(operation.id)}
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

export default OperationList;
