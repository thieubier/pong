import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/PieceDetail.css';

const PieceDetail = () => {
    const { id } = useParams();
    const [piece, setPiece] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPiece = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/pieces/${id}`);
                console.log('Piece details:', response.data);  // Log the piece details
                setPiece(response.data);
            } catch (error) {
                setError('Erreur lors de la récupération des détails de la pièce.');
                console.error('Error fetching piece details:', error);
            }
        };

        fetchPiece();
    }, [id]);

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer cette pièce ?');
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:3000/api/pieces/${id}`);
                toast.success('Pièce supprimée avec succès!');
                setTimeout(() => {
                    navigate('/pieces');
                }, 2000);
            } catch (error) {
                setError('Erreur lors de la suppression de la pièce.');
                console.error('Error deleting piece:', error);
            }
        }
    };

    if (error) {
        return <div className="piece-detail-container"><p>{error}</p></div>;
    }

    if (!piece) {
        return <div className="piece-detail-container"><p>Chargement...</p></div>;
    }

    return (
        <div className="piece-detail-page">
            <Link to="/pieces" className="piece-detail-back-button">Retour</Link>
            <div className="piece-detail-container">
                <h1 className="piece-detail-title">Détails de la Pièce</h1>
                <p><strong>Référence:</strong> {piece.reference}</p>
                <p><strong>Libellé:</strong> {piece.label}</p>
                <p><strong>Type:</strong> {translateType(piece.type)}</p>
                <p><strong>Prix:</strong> {piece.price}€</p>

                {piece.Components && piece.Components.length > 0 && (
                    <div className="piece-detail-components">
                        <h2>Composition</h2>
                        <table>
                            <thead>
                            <tr>
                                <th>Référence</th>
                                <th>Libellé</th>
                                <th>Quantité</th>
                            </tr>
                            </thead>
                            <tbody>
                            {piece.Components.map(component => (
                                <tr key={component.id}>
                                    <td>{component.ComponentPiece.reference}</td>
                                    <td>{component.ComponentPiece.label}</td>
                                    <td>{component.quantity}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
                <button className="piece-detail-delete-button" onClick={handleDelete}>Supprimer la Pièce</button>
            </div>
            <ToastContainer />
        </div>
    );
};

const translateType = (type) => {
    const typeMap = {
        finished_piece: 'Pièce finie',
        intermediate_piece: 'Pièce intermédiaire',
        raw_material: 'Matière première',
        purchased_piece: 'Pièce achetée'
    };

    return typeMap[type] || type;
};

export default PieceDetail;
