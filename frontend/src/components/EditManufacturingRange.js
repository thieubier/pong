import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './css/AddManufacturingRange.css';

const EditManufacturingRange = () => {
    const { id } = useParams();
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
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const [supervisorsResponse, piecesResponse, operationsResponse, rangeResponse] = await Promise.all([
                    axios.get('http://localhost:3000/api/users', { headers: { 'Authorization': `Bearer ${token}` } }),
                    axios.get('http://localhost:3000/api/pieces', { headers: { 'Authorization': `Bearer ${token}` } }),
                    axios.get('http://localhost:3000/api/operations', { headers: { 'Authorization': `Bearer ${token}` } }),
                    axios.get(`http://localhost:3000/api/manufacturing-ranges/${id}`, { headers: { 'Authorization': `Bearer ${token}` } })
                ]);

                setAllSupervisors(supervisorsResponse.data);
                setAllPieces(piecesResponse.data);
                setAllOperations(operationsResponse.data);

                const range = rangeResponse.data;
                setName(range.name);
                setSupervisorId(range.supervisor_id);
                setPieceId(range.piece_id);
                setSelectedOperations(range.Operations.map(op => ({ id: op.id, duration: op.ManufacturingRangeOperations.duration })));
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Erreur lors de la récupération des données');
            }
        };

        fetchData();
    }, [id]);

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
            await axios.put(`http://localhost:3000/api/manufacturing-ranges/${id}`, {
                name,
                supervisor_id: supervisorId,
                piece_id: pieceId,
                operations: selectedOperations
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            toast.success('Gamme de fabrication mise à jour avec succès', {
                onClose: () => navigate('/manufacturing-ranges')
            });
        } catch (error) {
            console.error('Error updating manufacturing range:', error);
            toast.error(`Erreur lors de la mise à jour de la gamme de fabrication: ${error.response?.data?.error || error.message}`);
        }
    };

    return (
        <div className="add-manufacturing-range-container">
            <h2 className="add-manufacturing-range-title">Modifier la Gamme de Fabrication</h2>
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
                    Modifier la Gamme
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default EditManufacturingRange;
