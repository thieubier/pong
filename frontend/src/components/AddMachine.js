import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/AddMachine.css';

const AddMachine = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [workstations, setWorkstations] = useState([]);
    const [selectedWorkstations, setSelectedWorkstations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
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
                toast.error('Erreur lors de la récupération des postes de travail');
            }
        };

        fetchWorkstations();
    }, []);

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSelectedWorkstations([...selectedWorkstations, value]);
        } else {
            setSelectedWorkstations(selectedWorkstations.filter(id => id !== value));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:3000/api/machines', {
                name,
                description,
                workstationIds: selectedWorkstations
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            toast.success('Machine créée avec succès', {
                onClose: () => navigate('/machines')
            });
        } catch (error) {
            console.error('Error creating machine:', error);
            toast.error(`Erreur lors de la création de la machine: ${error.response?.data?.error || error.message}`);
        }
    };

    return (
        <div className="add-machine-container">
            <h2 className="add-machine-title">Ajouter une Nouvelle Machine</h2>
            <form className="add-machine-form" onSubmit={handleSubmit}>
                <label>
                    Nom:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="add-machine-input"
                        required
                    />
                </label>
                <label>
                    Description:
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="add-machine-input"
                    />
                </label>
                <label>
                    Postes de travail:
                    <div className="workstation-checkboxes">
                        {workstations.map((workstation) => (
                            <div key={workstation.id}>
                                <label>
                                    <input
                                        type="checkbox"
                                        value={workstation.id}
                                        onChange={handleCheckboxChange}
                                    />
                                    {" "+workstation.name}
                                </label>
                            </div>
                        ))}
                    </div>
                </label>
                <button type="submit" className="add-machine-button">Ajouter la Machine</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default AddMachine;
