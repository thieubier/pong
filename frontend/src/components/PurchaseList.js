// frontend/src/components/PurchaseList.js
import React, { useState, useEffect } from 'react';
import api from '../api';
import './css/PurchaseList.css'; // Importer le fichier CSS

const PurchaseList = () => {
    const [purchases, setPurchases] = useState([]);

    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                const response = await api.get('/purchases');
                setPurchases(response.data);
            } catch (error) {
                console.error('Error fetching purchases:', error);
            }
        };

        fetchPurchases();
    }, []);

    return (
        <div className="purchase-list-container">
            <h1>Purchases</h1>
            <ul className="purchase-list">
                {purchases.map(purchase => (
                    <li key={purchase.id} className="purchase-item">
                        <span>{purchase.id}</span> - <span>{purchase.price}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PurchaseList;
