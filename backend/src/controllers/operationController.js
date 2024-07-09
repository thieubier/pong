const db = require('../models');

exports.createOperation = async (req, res) => {
    try {
        const { name, duration, manufacturing_range_id } = req.body;
        const operation = await db.Operation.create({ name, duration, manufacturing_range_id });
        res.status(201).json(operation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllOperations = async (req, res) => {
    try {
        const operations = await db.Operation.findAll();
        res.status(200).json(operations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getOperationById = async (req, res) => {
    try {
        const operation = await db.Operation.findByPk(req.params.id);
        if (!operation) {
            return res.status(404).json({ error: 'Operation not found' });
        }
        res.status(200).json(operation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateOperation = async (req, res) => {
    try {
        const { name, duration, manufacturing_range_id } = req.body;
        const operation = await db.Operation.findByPk(req.params.id);
        if (!operation) {
            return res.status(404).json({ error: 'Operation not found' });
        }
        await operation.update({ name, duration, manufacturing_range_id });
        res.status(200).json(operation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteOperation = async (req, res) => {
    try {
        const operation = await db.Operation.findByPk(req.params.id);
        if (!operation) {
            return res.status(404).json({ error: 'Operation not found' });
        }
        await operation.destroy();
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
