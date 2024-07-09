// frontend/src/components/AddPurchase.js
import React, { useState } from 'react';
import api from '../api';

const AddPurchase = () => {
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [orderDate, setOrderDate] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/purchases', {
                price,
                quantity,
                order_date: orderDate,
                delivery_date: deliveryDate,
            });
            alert('Purchase added successfully');
        } catch (error) {
            console.error('Error adding purchase:', error);
            alert('Failed to add purchase');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Price</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div>
                <label>Quantity</label>
                <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            </div>
            <div>
                <label>Order Date</label>
                <input type="date" value={orderDate} onChange={(e) => setOrderDate(e.target.value)} />
            </div>
            <div>
                <label>Delivery Date</label>
                <input type="date" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} />
            </div>
            <button type="submit">Add Purchase</button>
        </form>
    );
};

export default AddPurchase;
