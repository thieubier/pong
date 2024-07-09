import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/ManufacturingRangeFabricate.css';

const ManufacturingRangeFabricate = () => {
    const { id } = useParams();
    const [range, setRange] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3000/api/users/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setCurrentUser(response.data);
            } catch (error) {
                console.error('Error fetching current user:', error);
            }
        };

        const fetchRange = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:3000/api/manufacturing-ranges/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setRange(response.data);
            } catch (error) {
                console.error('Error fetching manufacturing range:', error);
            }
        };

        const fetchAllUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3000/api/users', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setAllUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchCurrentUser();
        fetchRange();
        fetchAllUsers();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!range || !range.Operations || !currentUser) {
            toast.error('Les informations nécessaires ne sont pas disponibles.');
            return;
        }

        const operations = range.Operations.map((operation) => {
            return {
                id: operation.id,
                duration: operation.ManufacturingRangeOperations.duration,
                workstation_id: operation.selectedWorkstationId || null,
                machine_id: operation.selectedMachineId || null,
                date: operation.date || new Date(),
                user_id: operation.selectedUserId || currentUser.id
            };
        });

        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:3000/api/realizations', {
                rangeId: range.id,
                operations
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            toast.success('Réalisation créée avec succès!', {
                onClose: () => navigate('/realizations')
            });
        } catch (error) {
            toast.error(`Erreur lors de la création de la réalisation: ${error.response?.data?.error || error.message}`);
        }
    };

    if (!range || !range.Workstations || !range.Machines || !allUsers.length) {
        console.log("range :", range, range?.Workstations, range?.Machines, allUsers);
        return <div>Chargement...</div>;
    }

    return (
        <div className="manufacturing-range-fabricate-container">
            <h1 className="manufacturing-range-fabricate-title">Fabrication de la Pièce</h1>
            <form onSubmit={handleSubmit} className="manufacturing-range-fabricate-form">
                {range.Operations.map((operation, index) => (
                    <div key={index} className="fabrication-operation-row">
                        <label>
                            Opération: {operation.name}
                        </label>
                        <input
                            type="number"
                            value={operation.ManufacturingRangeOperations.duration}
                            onChange={(e) => {
                                const newOperations = [...range.Operations];
                                newOperations[index].ManufacturingRangeOperations.duration = e.target.value;
                                setRange({ ...range, Operations: newOperations });
                            }}
                        />
                        <input
                            type="date"
                            value={operation.date ? operation.date.split('T')[0] : new Date().toISOString().split('T')[0]}
                            onChange={(e) => {
                                const newOperations = [...range.Operations];
                                newOperations[index].date = e.target.value;
                                setRange({ ...range, Operations: newOperations });
                            }}
                        />
                        <select
                            value={operation.selectedWorkstationId || ''}
                            onChange={(e) => {
                                const newOperations = [...range.Operations];
                                newOperations[index].selectedWorkstationId = e.target.value;
                                setRange({ ...range, Operations: newOperations });
                            }}
                        >
                            <option value="">Poste de travail</option>
                            {range.Workstations.map((workstation) => (
                                <option key={workstation.id} value={workstation.id}>
                                    {workstation.name}
                                </option>
                            ))}
                        </select>
                        <select
                            value={operation.selectedMachineId || ''}
                            onChange={(e) => {
                                const newOperations = [...range.Operations];
                                newOperations[index].selectedMachineId = e.target.value;
                                setRange({ ...range, Operations: newOperations });
                            }}
                        >
                            <option value="">Machine</option>
                            {range.Machines.map((machine) => (
                                <option key={machine.id} value={machine.id}>
                                    {machine.name}
                                </option>
                            ))}
                        </select>
                        <select
                            value={operation.selectedUserId || currentUser.id}
                            onChange={(e) => {
                                const newOperations = [...range.Operations];
                                newOperations[index].selectedUserId = e.target.value;
                                setRange({ ...range, Operations: newOperations });
                            }}
                        >
                            <option value="">Utilisateur</option>
                            {allUsers.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.username}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
                <button type="submit" className="manufacturing-range-fabricate-button">Fabriquer</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default ManufacturingRangeFabricate;
