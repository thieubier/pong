import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/UserDetail.css';

const UserDetail = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/users/${id}`);
                setUser(response.data);
            } catch (error) {
                setError('Erreur lors de la récupération des détails de l\'utilisateur.');
                console.error('Error fetching user details:', error);
            }
        };

        fetchUser();
    }, [id]);

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?');
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:3000/api/users/${id}`);
                toast.success('Utilisateur supprimé avec succès!');
                setTimeout(() => {
                    navigate('/users');
                }, 2000);
            } catch (error) {
                setError('Erreur lors de la suppression de l\'utilisateur.');
                console.error('Error deleting user:', error);
            }
        }
    };

    if (error) {
        return <div className="user-detail-container"><p>{error}</p></div>;
    }

    if (!user) {
        return <div className="user-detail-container"><p>Chargement...</p></div>;
    }

    return (
        <div className="user-detail-page">
            <Link to="/users" className="user-detail-back-button">Retour</Link>
            <div className="user-detail-container">
                <h1 className="user-detail-title">Détails de l'Utilisateur</h1>
                <p className="user-detail-info"><strong>Nom d'utilisateur:</strong> {user.username}</p>
                <p className="user-detail-info"><strong>Email:</strong> {user.email}</p>
                <p className="user-detail-info"><strong>Rôle:</strong> {user.role}</p>
                {user.role !== 'admin' && (
                    <button className="user-detail-delete-button" onClick={handleDelete}>Supprimer l'Utilisateur</button>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default UserDetail;
