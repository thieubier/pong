import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/PieceList.css';
import translateType from '../utils/translateType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEye, faSync } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PieceList = () => {
    const [pieces, setPieces] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userRole = localStorage.getItem('userRole');
        setIsAdmin(userRole === 'admin');

        fetchPieces();
    }, []);

    const fetchPieces = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/pieces');
            setPieces(response.data);
        } catch (error) {
            console.error('Error fetching pieces:', error);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer cette pièce ?');
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:3000/api/pieces/${id}`);
                toast.success('Pièce supprimée avec succès!');
                fetchPieces();
            } catch (error) {
                console.error('Error deleting piece:', error);
            }
        }
    };

    const getBadgeClassForType = (type) => {
        switch (type) {
            case 'Type1': return 'badge bg-primary';
            case 'Type2': return 'badge bg-success';
            case 'Type3': return 'badge bg-info';
            default: return 'badge bg-secondary';
        }
    };

    return (
        <div className="piece-list-background">
            <div className="piece-list-container">
                <h1 className="piece-list-title">Liste des Pièces</h1>
                <div className="button-container">
                    <button onClick={fetchPieces} className="refresh-button">
                        <FontAwesomeIcon icon={faSync} />
                    </button>
                    <Link to="/pieces/add" className="add-piece-button">Créer une nouvelle pièce</Link>
                </div>
                <table className="piece-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Libellé</th>
                        <th>Type</th>
                        <th>Prix</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {pieces.map(piece => (
                        <tr key={piece.id}>
                            <td>{piece.id}</td>
                            <td>{piece.label}</td>
                            <td>
                                <span className={getBadgeClassForType(piece.type)}>
                                    {translateType(piece.type)}
                                </span>
                            </td>
                            <td>{piece.price}.00€</td>
                            <td className="actions">
                                <button
                                    onClick={() => navigate(`/pieces/${piece.id}`)}
                                    className="detail-button"
                                >
                                    <FontAwesomeIcon icon={faEye} />
                                </button>
                                {isAdmin && (
                                    <button
                                        onClick={() => handleDelete(piece.id)}
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

export default PieceList;
