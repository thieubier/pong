import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './css/AddManufacturingRange.css';

const AddManufacturingRange = () => {
    const [name, setName] = useState('');
    const [supervisorId, setSupervisorId] = useState('');
    const [pieceId, setPieceId] = useState('');
    const [operations, setOperations] = useState([]);
    const [selectedOperations, setSelectedOperations] = useState([]);
    const [allSupervisors, setAllSupervisors] = useState([]);
    const [allPieces, setAllPieces] = useState([]);
    const [allOperations, setAllOperations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSupervisors = async () => {
            try {

                const response = await axios.get('http://localhost:3000/api/users');
                setAllSupervisors(response.data);
            } catch (error) {
                console.error('Error fetching supervisors:', error);
                toast.error('Erreur lors de la récupération des superviseurs');
            }
        };

        const fetchPieces = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/pieces');
                setAllPieces(response.data);
            } catch (error) {
                console.error('Error fetching pieces:', error);
                toast.error('Erreur lors de la récupération des pièces');
            }
        };

        const fetchOperations = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/operations');
                setAllOperations(response.data);
            } catch (error) {
                console.error('Error fetching operations:', error);
                toast.error('Erreur lors de la récupération des opérations');
            }
        };

        fetchSupervisors();
        fetchPieces();
        fetchOperations();
    }, []);

    const handleAddOperation = () => {
        setSelectedOperations([...selectedOperations, { id: '', duration: 1 }]);
    };

    const handleOperationChange = (index, field, value) => {
        const updatedOperations = selectedOperations.map((operation, i) =>
            i === index ? { ...operation, [field]: value } : operation
        );
        setSelectedOperations(updatedOperations);
    };

    const handleRemoveOperation = (index) => {
        setSelectedOperations(selectedOperations.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const response =
                await axios.post('http://localhost:3000/api/manufacturing-ranges', {
                name,
                supervisor_id: supervisorId,
                piece_id: pieceId,
                operations: selectedOperations
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            toast.success('Gamme de fabrication créée avec succès', {
                onClose: () => navigate('/manufacturing-ranges')
            });
        } catch (error) {
            console.error('Error creating manufacturing range:', error);
            toast.error(`Erreur lors de la création de la gamme de fabrication: ${error.response?.data?.error || error.message}`);
        }
    };

    return (
        <div className="add-manufacturing-range-container">
            <h2 className="add-manufacturing-range-title">Ajouter une Nouvelle Gamme de Fabrication</h2>
            <form className="add-manufacturing-range-form" onSubmit={handleSubmit}>
                <label>
                    Nom:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="add-manufacturing-range-input"
                        required
                    />
                </label>
                <label>
                    Superviseur:
                    <select
                        value={supervisorId}
                        onChange={(e) => setSupervisorId(e.target.value)}
                        className="add-manufacturing-range-input"
                        required
                    >
                        <option value="">Sélectionnez un superviseur</option>
                        {allSupervisors.map((supervisor) => (
                            <option key={supervisor.id} value={supervisor.id}>
                                {supervisor.username}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Pièce:
                    <select
                        value={pieceId}
                        onChange={(e) => setPieceId(e.target.value)}
                        className="add-manufacturing-range-input"
                        required
                    >
                        <option value="">Sélectionnez une pièce</option>
                        {allPieces.map((piece) => (
                            <option key={piece.id} value={piece.id}>
                                {piece.label}
                            </option>
                        ))}
                    </select>
                </label>
                <h3>Opérations</h3>
                {selectedOperations.map((operation, index) => (
                    <div key={index} className="operation-row">
                        <select
                            value={operation.id}
                            onChange={(e) => handleOperationChange(index, 'id', e.target.value)}
                            className="add-manufacturing-range-input"
                            required
                        >
                            <option value="">Sélectionnez une opération</option>
                            {allOperations.map((op) => (
                                <option key={op.id} value={op.id}>
                                    {op.name}
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            value={operation.duration}
                            onChange={(e) => handleOperationChange(index, 'duration', e.target.value)}
                            className="add-manufacturing-range-input"
                            min="1"
                            required
                        />
                        <button type="button" onClick={() => handleRemoveOperation(index)}
                                className="remove-operation-button">
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                ))}
                <button type="button" onClick={handleAddOperation} className="add-operation-button">
                    Ajouter une Opération
                </button>
                <div className="separator"></div>
                <button type="submit" className="add-manufacturing-range-button">
                    Ajouter la Gamme
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default AddManufacturingRange;
