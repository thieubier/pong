const db = require('../models');

exports.createManufacturingRange = async (req, res) => {
    try {
        const { name, supervisor_id, piece_id, operations } = req.body;

        // Vérifiez si une gamme de fabrication existe déjà pour cette pièce
        const existingRange = await db.ManufacturingRange.findOne({ where: { piece_id } });
        if (existingRange) {
            return res.status(400).json({ error: 'Une gamme de fabrication existe déjà pour cette pièce.' });
        }

        const manufacturingRange = await db.ManufacturingRange.create({ name, supervisor_id, piece_id });

        // Ajouter les opérations à la gamme
        if (operations && operations.length > 0) {
            for (const operation of operations) {
                await db.ManufacturingRangeOperations.create({
                    manufacturing_range_id: manufacturingRange.id,
                    operation_id: operation.id,
                    duration: operation.duration
                });
            }
        }

        res.status(201).json(manufacturingRange);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllManufacturingRanges = async (req, res) => {
    try {
        const manufacturingRanges = await db.ManufacturingRange.findAll({
            include: [
                {
                    model: db.Piece,
                    as: 'Piece'
                },
                {
                    model: db.User,
                    as: 'Supervisor'
                },
                {
                    model: db.Operation,
                    as: 'Operations',
                    through: { attributes: ['duration'] }
                }
            ]
        });

        res.status(200).json(manufacturingRanges);
    } catch (err) {
        console.error('Error fetching manufacturing ranges:', err); // Log the error
        res.status(500).json({ error: err.message });
    }
};

exports.getManufacturingRangeById = async (req, res) => {
    try {
        const manufacturingRange = await db.ManufacturingRange.findByPk(req.params.id, {
            include: [
                {
                    model: db.Piece,
                    as: 'Piece'
                },
                {
                    model: db.User,
                    as: 'Supervisor'
                },
                {
                    model: db.Operation,
                    as: 'Operations',
                    through: { attributes: ['duration'] }
                },
                {
                    model: db.Workstation,
                    as: 'Workstations'
                },
                {
                    model: db.Machine,
                    as: 'Machines'
                }
            ]
        });

        if (!manufacturingRange) {
            return res.status(404).json({ error: 'Gamme de fabrication non trouvée' });
        }

        res.status(200).json(manufacturingRange);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



exports.updateManufacturingRange = async (req, res) => {
    try {
        const { name, supervisor_id, piece_id, operations } = req.body;
        const manufacturingRange = await db.ManufacturingRange.findByPk(req.params.id);
        if (!manufacturingRange) {
            return res.status(404).json({ error: 'Manufacturing Range not found' });
        }

        // Vérifiez si une gamme de fabrication existe déjà pour cette pièce
        if (piece_id && piece_id !== manufacturingRange.piece_id) {
            const existingRange = await db.ManufacturingRange.findOne({ where: { piece_id } });
            if (existingRange) {
                return res.status(400).json({ error: 'Une gamme de fabrication existe déjà pour cette pièce.' });
            }
        }

        await manufacturingRange.update({ name, supervisor_id, piece_id });

        // Mettre à jour les opérations associées à la gamme
        if (operations && operations.length > 0) {
            await db.ManufacturingRangeOperations.destroy({ where: { manufacturing_range_id: manufacturingRange.id } });
            for (const operation of operations) {
                await db.ManufacturingRangeOperations.create({
                    manufacturing_range_id: manufacturingRange.id,
                    operation_id: operation.id,
                    duration: operation.duration
                });
            }
        }

        const updatedRange = await db.ManufacturingRange.findByPk(req.params.id, {
            include: [
                { model: db.User, as: 'Supervisor' },
                { model: db.Piece, as: 'Piece' },
                { model: db.Operation, as: 'Operations', through: { attributes: ['duration'] } }
            ]
        });

        res.status(200).json(updatedRange);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteManufacturingRange = async (req, res) => {
    try {
        const manufacturingRange = await db.ManufacturingRange.findByPk(req.params.id);
        if (!manufacturingRange) {
            return res.status(404).json({ error: 'Manufacturing Range not found' });
        }
        await manufacturingRange.destroy();
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
