// controllers/realizationController.js
const db = require('../models');

exports.getAllRealizations = async (req, res) => {
    try {
        const realizations = await db.Realization.findAll({
            include: [
                { model: db.User, as: 'User', attributes: ['username', 'email'] }, // Inclure les utilisateurs
                { model: db.ManufacturingRange, as: 'ManufacturingRange' },
                { model: db.Operation, as: 'Operation' },
                { model: db.Workstation, as: 'Workstation' },
                { model: db.Machine, as: 'Machine' }
            ]
        });
        res.status(200).json(realizations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createRealizations = async (req, res) => {
    const { rangeId, operations, userId } = req.body;

    try {
        const realizations = await Promise.all(
            operations.map(async (operation) => {
                return await db.Realization.create({
                    manufacturing_range_id: rangeId,
                    operation_id: operation.id,
                    duration: operation.duration,
                    workstation_id: operation.workstation_id,
                    machine_id: operation.machine_id,
                    user_id: userId,
                    date: operation.date || new Date() // Utilisation de la date de l'opération ou la date actuelle
                });
            })
        );

        res.status(201).json(realizations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
