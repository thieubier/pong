// controllers/workstationController.js
const db = require('../models');

exports.getAllWorkstations = async (req, res) => {
    try {
        const workstations = await db.Workstation.findAll({
            include: [{ model: db.Machine, as: 'Machines' }]
        });
        res.status(200).json(workstations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createWorkstation = async (req, res) => {
    try {
        const { name, machineIds } = req.body;
        const workstation = await db.Workstation.create({ name });

        if (machineIds && machineIds.length > 0) {
            await workstation.setMachines(machineIds);
        }

        res.status(201).json(workstation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getWorkstationById = async (req, res) => {
    try {
        const workstation = await db.Workstation.findByPk(req.params.id, {
            include: [{ model: db.Machine, as: 'Machines' }]
        });
        if (!workstation) {
            return res.status(404).json({ error: 'Workstation not found' });
        }
        res.status(200).json(workstation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateWorkstation = async (req, res) => {
    try {
        const { name, machineIds } = req.body;
        const workstation = await db.Workstation.findByPk(req.params.id);
        if (!workstation) {
            return res.status(404).json({ error: 'Workstation not found' });
        }

        workstation.name = name;
        await workstation.save();

        if (machineIds && machineIds.length > 0) {
            await workstation.setMachines(machineIds);
        }

        res.status(200).json(workstation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteWorkstation = async (req, res) => {
    try {
        const workstation = await db.Workstation.findByPk(req.params.id);
        if (!workstation) {
            return res.status(404).json({ error: 'Workstation not found' });
        }

        await workstation.destroy();
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getMachinesByWorkstationId = async (req, res) => {
    try {
        const workstation = await db.Workstation.findByPk(req.params.id, {
            include: [{
                model: db.Machine,
                as: 'Machines'
            }]
        });

        if (!workstation) {
            return res.status(404).json({ error: 'Poste de travail non trouvé' });
        }

        res.status(200).json(workstation.Machines);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};