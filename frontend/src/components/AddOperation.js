import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/AddOperation.css';

const AddOperation = () => {
    const [name, setName] = useState('');
    const [duration, setDuration] = useState(1);
    const [workstations, setWorkstations] = useState([]);
    const [selectedWorkstation, setSelectedWorkstation] = useState('');
    const [machines, setMachines] = useState([]);
    const [selectedMachine, setSelectedMachine] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchWorkstations = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/workstations', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setWorkstations(response.data);
            } catch (error) {
                console.error('Error fetching workstations:', error);
            }
        };

        fetchWorkstations();
    }, []);

    useEffect(() => {
        const fetchMachines = async () => {
            if (selectedWorkstation) {
                try {
                    const response = await axios.get(`http://localhost:3000/api/workstations/${selectedWorkstation}/machines`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                    setMachines(response.data);
                } catch (error) {
                    console.error('Error fetching machines:', error);
                }
            }
        };

        fetchMachines();
    }, [selectedWorkstation]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:3000/api/operations', {
                name,
                duration,
                workstation_id: selectedWorkstation,
                machine_id: selectedMachine
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            toast.success('Opération créée avec succès', {
                onClose: () => navigate('/operations')
            });
        } catch (error) {
            console.error('Error creating operation:', error);
            toast.error(`Erreur lors de la création de l'opération: ${error.response?.data?.error || error.message}`);
        }
    };

    return (
        <div className="add-operation-container">
            <h2 className="add-operation-title">Ajouter une Nouvelle Opération</h2>
            <form className="add-operation-form" onSubmit={handleSubmit}>
                <label>
                    Nom:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="add-operation-input"
                        required
                    />
                </label>
                <label>
                    Durée:
                    <input
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="add-operation-input"
                        min="1"
                        required
                    />
                </label>
                <label>
                    Poste de travail:
                    <select
                        value={selectedWorkstation}
                        onChange={(e) => setSelectedWorkstation(e.target.value)}
                        className="add-operation-input"
                        required
                    >
                        <option value="">Sélectionnez un poste de travail</option>
                        {workstations.map((workstation) => (
                            <option key={workstation.id} value={workstation.id}>
                                {workstation.name}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Machine:
                    <select
                        value={selectedMachine}
                        onChange={(e) => setSelectedMachine(e.target.value)}
                        className="add-operation-input"
                        required
                    >
                        <option value="">Sélectionnez une machine</option>
                        {machines.map((machine) => (
                            <option key={machine.id} value={machine.id}>
                                {machine.name}
                            </option>
                        ))}
                    </select>
                </label>
                <button type="submit" className="add-operation-button">Ajouter l'Opération</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default AddOperation;
