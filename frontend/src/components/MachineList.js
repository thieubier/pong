import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/MachineList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEye, faSync } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MachineList = () => {
    const [machines, setMachines] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMachines();
    }, []);

    const fetchMachines = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3000/api/machines', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setMachines(response.data);
        } catch (error) {
            console.error('Error fetching machines:', error);
        }
    };

    const handleDelete = async (id) => {
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
                fetchMachines();
            } catch (error) {
                console.error('Error deleting machine:', error);
            }
        }
    };

    return (
        <div className="machine-list-background">
            <div className="machine-list-container">
                <h1 className="machine-list-title">Liste des Machines</h1>
                <div className="button-container">
                    <button onClick={fetchMachines} className="refresh-button">
                        <FontAwesomeIcon icon={faSync} />
                    </button>
                    <Link to="/machines/add" className="add-machine-button">Créer une nouvelle machine</Link>
                </div>
                <table className="machine-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {machines.map(machine => (
                        <tr key={machine.id}>
                            <td>{machine.id}</td>
                            <td>{machine.name}</td>
                            <td>{machine.description}</td>
                            <td className="actions">
                                <button
                                    onClick={() => navigate(`/machines/${machine.id}`)}
                                    className="detail-button"
                                >
                                    <FontAwesomeIcon icon={faEye} />
                                </button>
                                <button
                                    onClick={() => handleDelete(machine.id)}
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

export default MachineList;
