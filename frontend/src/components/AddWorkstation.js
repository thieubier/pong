import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/AddWorkstation.css';

const AddWorkstation = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [machines, setMachines] = useState([]);
    const [selectedMachines, setSelectedMachines] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
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
                toast.error('Erreur lors de la récupération des machines');
            }
        };

        fetchMachines();
    }, []);

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSelectedMachines([...selectedMachines, value]);
        } else {
            setSelectedMachines(selectedMachines.filter(id => id !== value));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:3000/api/workstations', {
                name,
                description,
                machineIds: selectedMachines
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            toast.success('Poste de travail créé avec succès', {
                onClose: () => navigate('/workstations')
            });
        } catch (error) {
            console.error('Error creating workstation:', error);
            toast.error(`Erreur lors de la création du poste de travail: ${error.response?.data?.error || error.message}`);
        }
    };

    return (
        <div className="add-workstation-container">
            <h2 className="add-workstation-title">Ajouter un Nouveau Poste de Travail</h2>
            <form className="add-workstation-form" onSubmit={handleSubmit}>
                <label>
                    Nom:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="add-workstation-input"
                        required
                    />
                </label>
                <label>
                    Description:
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="add-workstation-input"
                    />
                </label>
                <label>
                    Machines:
                    <div className="machine-checkboxes">
                        {machines.map((machine) => (
                            <div key={machine.id}>
                                <label>
                                    <input
                                        type="checkbox"
                                        value={machine.id}
                                        onChange={handleCheckboxChange}
                                    />
                                    {machine.name}
                                </label>
                            </div>
                        ))}
                    </div>
                </label>
                <button type="submit" className="add-workstation-button">Ajouter le Poste de Travail</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default AddWorkstation;
