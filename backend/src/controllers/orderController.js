// backend/src/controllers/orderController.js
const db = require('../models');

exports.createOrder = async (req, res) => {
    try {
        const order = await db.Order.create(req.body, {
            include: [{ model: db.OrderLine, as: 'OrderLines' }]
        });
        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await db.Order.findAll({ include: 'OrderLines' });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const order = await db.Order.findByPk(req.params.id, { include: 'OrderLines' });
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const order = await db.Order.findByPk(req.params.id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        await order.update(req.body);
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const order = await db.Order.findByPk(req.params.id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        await order.destroy();
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
