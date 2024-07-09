// frontend/src/components/OrderList.js
import React, { useState, useEffect } from 'react';
import api from '../api';
import './css/OrderList.css'; // Importer le fichier CSS

const OrderList = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get('/orders');
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="order-list-container">
            <h1>Orders</h1>
            <ul className="order-list">
                {orders.map(order => (
                    <li key={order.id} className="order-item">
                        <span>{order.id}</span> - <span>{order.order_date}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderList;
