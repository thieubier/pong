import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/Profile.css';

const Profile = () => {
    const [user, setUser] = useState({});
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/users/me', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
                toast.error('Erreur lors de la récupération des informations utilisateur.');
            }
        };

        fetchUser();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        navigate('/login');
    };

    const confirmLogout = () => {
        setShowLogoutConfirm(true);
    };

    const cancelLogout = () => {
        setShowLogoutConfirm(false);
    };

    return (
        <div className="profile-container">
            <h1 className="profile-title">Mon Profil</h1>
            <div className="profile-details">
                <p><strong>Nom d'utilisateur :</strong> {user.username}</p>
                <p><strong>Email :</strong> {user.email}</p>
                <p><strong>Rôle :</strong> {user.role}</p>
                <button onClick={confirmLogout} className="logout-button">Déconnexion</button>
            </div>
            {showLogoutConfirm && (
                <div className="logout-confirm-popup">
                    <p>Êtes-vous sûr de vouloir vous déconnecter ?</p>
                    <button onClick={handleLogout} className="confirm-logout-button">Oui</button>
                    <button onClick={cancelLogout} className="cancel-logout-button">Non</button>
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default Profile;
