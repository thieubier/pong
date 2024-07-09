import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faFileInvoiceDollar, faShoppingCart, faBoxOpen, faTasks, faCogs, faUserCheck, faClipboardCheck, faProjectDiagram, faToolbox } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
    const [usersCount, setUsersCount] = useState(0);
    const [quotationsCount, setQuotationsCount] = useState(0);
    const [ordersCount, setOrdersCount] = useState(0);
    const [purchasesCount, setPurchasesCount] = useState(0);
    const [workstationsCount, setWorkstationsCount] = useState(0);
    const [piecesCount, setPiecesCount] = useState(0);
    const [realizationsCount, setRealizationsCount] = useState(0);
    const [operationsCount, setOperationsCount] = useState(0);
    const [rangesCount, setRangesCount] = useState(0);
    const [me, setMe] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersResponse = await axios.get('http://localhost:3000/api/users');
                setUsersCount(usersResponse.data.length);

                const quotationsResponse = await axios.get('http://localhost:3000/api/quotations');
                setQuotationsCount(quotationsResponse.data.length);

                const ordersResponse = await axios.get('http://localhost:3000/api/orders');
                setOrdersCount(ordersResponse.data.length);

                const purchasesResponse = await axios.get('http://localhost:3000/api/purchases');
                setPurchasesCount(purchasesResponse.data.length);

                const workstationsResponse = await axios.get('http://localhost:3000/api/workstations', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setWorkstationsCount(workstationsResponse.data.length);

                const piecesResponse = await axios.get('http://localhost:3000/api/pieces');
                setPiecesCount(piecesResponse.data.length);

                const meResponse = await axios.get('http://localhost:3000/api/users/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setMe(meResponse.data.username);

                const realizationsResponse = await axios.get('http://localhost:3000/api/realizations');
                setRealizationsCount(realizationsResponse.data.length);

                const operationsResponse = await axios.get('http://localhost:3000/api/operations');
                setOperationsCount(operationsResponse.data.length);

                const rangesResponse = await axios.get('http://localhost:3000/api/manufacturing-ranges', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setRangesCount(rangesResponse.data.length);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Tableau de bord</h1>
            <div className="welcome-message">Bonjour, {me}</div> {/* Ajout du message de bienvenue */}
            <div className="overview">
                <div className="overview-item" onClick={() => navigate('/users')}>
                    <FontAwesomeIcon icon={faUsers} className="icon" />
                    <h3>Utilisateurs</h3>
                    <p>{usersCount}</p>
                </div>
                <div className="overview-item" onClick={() => navigate('/quotations')}>
                    <FontAwesomeIcon icon={faFileInvoiceDollar} className="icon" />
                    <h3>Devis</h3>
                    <p>{quotationsCount}</p>
                </div>
                <div className="overview-item" onClick={() => navigate('/orders')}>
                    <FontAwesomeIcon icon={faShoppingCart} className="icon" />
                    <h3>Commandes</h3>
                    <p>{ordersCount}</p>
                </div>
                <div className="overview-item" onClick={() => navigate('/purchases')}>
                    <FontAwesomeIcon icon={faBoxOpen} className="icon" />
                    <h3>Achats</h3>
                    <p>{purchasesCount}</p>
                </div>
                <div className="overview-item" onClick={() => navigate('/workstations')}>
                    <FontAwesomeIcon icon={faToolbox} className="icon" />
                    <h3>Postes de Travail</h3>
                    <p>{workstationsCount}</p>
                </div>
                <div className="overview-item" onClick={() => navigate('/pieces')}>
                    <FontAwesomeIcon icon={faCogs} className="icon" />
                    <h3>Pièces</h3>
                    <p>{piecesCount}</p>
                </div>
                <div className="overview-item" onClick={() => navigate('/realizations')}>
                    <FontAwesomeIcon icon={faClipboardCheck} className="icon" />
                    <h3>Réalisations</h3>
                    <p>{realizationsCount}</p>
                </div>
                <div className="overview-item" onClick={() => navigate('/operations')}>
                    <FontAwesomeIcon icon={faUserCheck} className="icon" />
                    <h3>Opérations</h3>
                    <p>{operationsCount}</p>
                </div>
                <div className="overview-item" onClick={() => navigate('/manufacturing-ranges')}>
                    <FontAwesomeIcon icon={faProjectDiagram} className="icon" />
                    <h3>Gammes</h3>
                    <p>{rangesCount}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
