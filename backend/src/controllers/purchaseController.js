// backend/src/controllers/purchaseController.js
const db = require('../models');

exports.createPurchase = async (req, res) => {
    try {
        const purchase = await db.Purchase.create(req.body);
        res.status(201).json(purchase);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllPurchases = async (req, res) => {
    try {
        const purchases = await db.Purchase.findAll();
        res.status(200).json(purchases);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getPurchaseById = async (req, res) => {
    try {
        const purchase = await db.Purchase.findByPk(req.params.id);
        if (!purchase) {
            return res.status(404).json({ error: 'Purchase not found' });
        }
        res.status(200).json(purchase);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updatePurchase = async (req, res) => {
    try {
        const purchase = await db.Purchase.findByPk(req.params.id);
        if (!purchase) {
            return res.status(404).json({ error: 'Purchase not found' });
        }
        await purchase.update(req.body);
        res.status(200).json(purchase);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deletePurchase = async (req, res) => {
    try {
        const purchase = await db.Purchase.findByPk(req.params.id);
        if (!purchase) {
            return res.status(404).json({ error: 'Purchase not found' });
        }
        await purchase.destroy();
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
