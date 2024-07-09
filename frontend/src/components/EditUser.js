import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/EditUser.css';

const EditUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState({ username: '', email: '', role: '' });
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/api/users/${id}`, user);
            toast.success('Utilisateur mis à jour avec succès!', {
                onClose: () => navigate('/users')
            });
        } catch (error) {
            setError('Erreur lors de la mise à jour de l\'utilisateur.');
            console.error('Error updating user:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    if (error) {
        return <div className="edit-user-container"><p>{error}</p></div>;
    }

    return (
        <div className="edit-user-page">
            <Link to="/users" className="edit-user-back-button">Retour</Link>
            <div className="edit-user-container">
                <h1 className="edit-user-title">Modifier l'Utilisateur</h1>
                <form onSubmit={handleSubmit} className="edit-user-form">
                    <label>
                        Nom d'utilisateur:
                        <input
                            type="text"
                            name="username"
                            value={user.username}
                            onChange={handleChange}
                            className="edit-user-input"
                            required
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            className="edit-user-input"
                            required
                        />
                    </label>
                    <label>
                        Rôle:
                        <select
                            name="role"
                            value={user.role}
                            onChange={handleChange}
                            className="edit-user-input"
                            required
                        >
                            <option value="user">Utilisateur</option>
                            <option value="admin">Administrateur</option>
                        </select>
                    </label>
                    <button type="submit" className="edit-user-button">Mettre à jour</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default EditUser;
