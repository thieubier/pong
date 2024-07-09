const db = require('../models');

exports.createRealizationHistory = async (req, res) => {
    try {
        const { operation_id, worker_id, workstation_id, machine_id, time_spent } = req.body;
        const realizationHistory = await db.RealizationHistory.create({
            operation_id, worker_id, workstation_id, machine_id, time_spent
        });
        res.status(201).json(realizationHistory);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllRealizationHistories = async (req, res) => {
    try {
        const realizationHistories = await db.RealizationHistory.findAll({
            include: [
                { model: db.Operation, as: 'operation' },
                { model: db.User, as: 'worker' },
                { model: db.WorkStation, as: 'workStation' },
                { model: db.Machine, as: 'machine' }
            ]
        });
        res.status(200).json(realizationHistories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getRealizationHistoryById = async (req, res) => {
    try {
        const realizationHistory = await db.RealizationHistory.findByPk(req.params.id, {
            include: [
                { model: db.Operation, as: 'operation' },
                { model: db.User, as: 'worker' },
                { model: db.WorkStation, as: 'workStation' },
                { model: db.Machine, as: 'machine' }
            ]
        });
        if (!realizationHistory) {
            return res.status(404).json({ error: 'Realization History not found' });
        }
        res.status(200).json(realizationHistory);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateRealizationHistory = async (req, res) => {
    try {
        const { operation_id, worker_id, workstation_id, machine_id, time_spent } = req.body;
        const realizationHistory = await db.RealizationHistory.findByPk(req.params.id);
        if (!realizationHistory) {
            return res.status(404).json({ error: 'Realization History not found' });
        }
        await realizationHistory.update({
            operation_id, worker_id, workstation_id, machine_id, time_spent
        });
        res.status(200).json(realizationHistory);
    } catch (err) {
        res.status(500).json({ error: err.message });
        }
    };

    exports.deleteRealizationHistory = async (req, res) => {
        try {
            const realizationHistory = await db.RealizationHistory.findByPk(req.params.id);
            if (!realizationHistory) {
                return res.status(404).json({ error: 'Realization History not found' });
            }
            await realizationHistory.destroy();
            res.status(204).send();
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };
