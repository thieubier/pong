import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableTennis, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import './css/Navbar.css';

const Navbar = () => {
    const [atelierOpen, setAtelierOpen] = useState(false);
    const [comptableOpen, setComptableOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        const confirmLogout = window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?');
        if (confirmLogout) {
            localStorage.removeItem('token');
            localStorage.removeItem('userRole');
            navigate('/login');
        }
    };

    return (
        <div className="sidebar">
            <div className="sidebar-logo">
                <FontAwesomeIcon icon={faTableTennis} className="icon" /> Pong
            </div>
            <hr className="sidebar-separator" />
            <div className="sidebar-links">
                <Link to="/dashboard" className="sidebar-link">Dashboard</Link>

                <div className="sidebar-dropdown">
                    <button className="sidebar-link dropdown-toggle" onClick={() => setAtelierOpen(!atelierOpen)}>
                        Atelier <FontAwesomeIcon icon={atelierOpen ? faChevronUp : faChevronDown} />
                    </button>
                    {atelierOpen && (
                        <div className="sidebar-dropdown-menu">
                            <Link to="/pieces" className="sidebar-sublink">Pièces</Link>
                            <Link to="/manufacturing-ranges" className="sidebar-sublink">Gammes</Link>
                            <Link to="/operations" className="sidebar-sublink">Opérations</Link>
                            <Link to="/workstations" className="sidebar-sublink">Postes de Travail</Link>
                            <Link to="/machines" className="sidebar-sublink">Machines</Link>
                        </div>
                    )}
                </div>

                <div className="sidebar-dropdown">
                    <button className="sidebar-link dropdown-toggle" onClick={() => setComptableOpen(!comptableOpen)}>
                        Comptable <FontAwesomeIcon icon={comptableOpen ? faChevronUp : faChevronDown} />
                    </button>
                    {comptableOpen && (
                        <div className="sidebar-dropdown-menu">
                            <Link to="/quotations" className="sidebar-sublink">Devis</Link>
                            <Link to="/orders" className="sidebar-sublink">Commandes</Link>
                            <Link to="/purchases" className="sidebar-sublink">Achats</Link>
                        </div>
                    )}
                </div>

                <Link to="/users" className="sidebar-link">Utilisateurs</Link>
                <Link to="/profile" className="sidebar-link">Profil</Link>
            </div>
            <button onClick={handleLogout} className="sidebar-logout">Déconnexion</button>
        </div>
    );
};

export default Navbar;
