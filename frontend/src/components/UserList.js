import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './css/UserList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        const userRole = localStorage.getItem('userRole');
        setIsAdmin(userRole === 'admin');

        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?');
        if (confirmDelete) {
            try {
                await api.delete(`/users/${id}`);
                toast.success('Utilisateur supprimé avec succès!');
                setUsers(users.filter(user => user.id !== id));
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    return (
        <div className="user-list-container">
            <h1 className="user-list-title">Liste des Utilisateurs</h1>
            <table className="user-list-table">
                <thead>
                <tr>
                    <th>Nom d'utilisateur</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.id} className="user-item">
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td className="actions">
                            <button
                                onClick={() => navigate(`/users/${user.id}`)}
                                className="view-button"
                            >
                                <FontAwesomeIcon icon={faEye} />
                            </button>
                            {isAdmin && (
                                <>
                                    <button
                                        onClick={() => navigate(`/users/edit/${user.id}`)}
                                        className="edit-button"
                                    >
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="delete-button"
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <ToastContainer />
        </div>
    );
};

export default UserList;
