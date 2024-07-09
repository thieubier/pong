// frontend/src/components/AddOrder.js
import React, { useState } from 'react';
import api from '../api';

const AddOrder = () => {
    const [orderDate, setOrderDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/orders', {
                order_date: orderDate,
            });
            alert('Order added successfully');
        } catch (error) {
            console.error('Error adding order:', error);
            alert('Failed to add order');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Order Date</label>
                <input type="date" value={orderDate} onChange={(e) => setOrderDate(e.target.value)} />
            </div>
            <button type="submit">Add Order</button>
        </form>
    );
};

export default AddOrder;
