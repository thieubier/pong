import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './css/AddPiece.css';

const AddPiece = () => {
    const [reference, setReference] = useState('');
    const [label, setLabel] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');
    const [components, setComponents] = useState([]);
    const [allPieces, setAllPieces] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPieces = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3000/api/pieces', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setAllPieces(response.data);
            } catch (error) {
                console.error('Error fetching pieces:', error);
                toast.error('Erreur lors de la récupération des pièces');
            }
        };

        fetchPieces();
    }, []);

    const handleAddComponent = () => {
        setComponents([...components, { id: '', quantity: 1 }]);
    };

    const handleComponentChange = (index, field, value) => {
        const updatedComponents = components.map((component, i) =>
            i === index ? { ...component, [field]: value } : component
        );
        setComponents(updatedComponents);
    };

    const handleRemoveComponent = (index) => {
        setComponents(components.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:3000/api/pieces', {
                reference,
                label,
                type,
                price,
                components,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            toast.success('Pièce créée avec succès', {
                onClose: () => navigate('/pieces')
            });
        } catch (error) {
            console.error('Error creating piece:', error);
            toast.error(`Erreur lors de la création de la pièce: ${error.response?.data?.error || error.message}`);
        }
    };

    return (
        <div className="add-piece-container">
            <h2 className="add-piece-title">Ajouter une Nouvelle Pièce</h2>
            <form className="add-piece-form" onSubmit={handleSubmit}>
                <label>
                    Référence:
                    <input
                        type="text"
                        value={reference}
                        onChange={(e) => setReference(e.target.value)}
                        className="add-piece-input"
                        required
                    />
                </label>
                <label>
                    Libellé:
                    <input
                        type="text"
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                        className="add-piece-input"
                        required
                    />
                </label>
                <label>
                    Type:
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="add-piece-input"
                        required
                    >
                        <option value="">Sélectionnez un type</option>
                        <option value="finished_piece">Pièce finie</option>
                        <option value="intermediate_piece">Pièce intermédiaire</option>
                        <option value="raw_material">Matière première</option>
                        <option value="purchased_piece">Pièce achetée</option>
                    </select>
                </label>
                <label>
                    Prix:
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="add-piece-input"
                        required
                    />
                </label>
                <h3>Composants</h3>
                {components.map((component, index) => (
                    <div key={index} className="component-row">
                        <select
                            value={component.id}
                            onChange={(e) => handleComponentChange(index, 'id', e.target.value)}
                            className="add-piece-input"
                            required
                        >
                            <option value="">Sélectionnez une pièce</option>
                            {allPieces.map((piece) => (
                                <option key={piece.id} value={piece.id}>
                                    {piece.label}
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            value={component.quantity}
                            onChange={(e) => handleComponentChange(index, 'quantity', e.target.value)}
                            className="add-piece-input"
                            min="1"
                            required
                        />
                        <button type="button" onClick={() => handleRemoveComponent(index)}
                                className="remove-component-button">
                            <FontAwesomeIcon icon={faTrash}/>
                        </button>
                    </div>
                ))}
                <button type="button" onClick={handleAddComponent} className="add-component-button">
                    Ajouter un Composant
                </button>
                <div className="separator"></div>
                <button type="submit" className="add-piece-button">
                    Ajouter la Pièce
                </button>
            </form>
            <ToastContainer/>
        </div>
    );
};

export default AddPiece;
