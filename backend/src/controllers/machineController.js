// controllers/machineController.js
const db = require('../models');

exports.getAllMachines = async (req, res) => {
    try {
        const machines = await db.Machine.findAll({
            include: [{ model: db.Workstation, as: 'Workstations' }]
        });
        res.status(200).json(machines);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createMachine = async (req, res) => {
    try {
        const { name, description, workstationIds } = req.body;
        const machine = await db.Machine.create({ name, description });

        if (workstationIds && workstationIds.length > 0) {
            await machine.setWorkstations(workstationIds);
        }

        res.status(201).json(machine);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getMachineById = async (req, res) => {
    try {
        const machine = await db.Machine.findByPk(req.params.id, {
            include: [{ model: db.Workstation, as: 'Workstations' }]
        });
        if (!machine) {
            return res.status(404).json({ error: 'Machine not found' });
        }
        res.status(200).json(machine);
    } catch (err) {
        res.status(500).json({ error: err.message });
        }
    };

exports.updateMachine = async (req, res) => {
    try {
        const { name, description, workstationIds } = req.body;
        const machine = await db.Machine.findByPk(req.params.id);
        if (!machine) {
            return res.status(404).json({ error: 'Machine not found' });
        }

        machine.name = name;
        machine.description = description;
        await machine.save();

        if (workstationIds && workstationIds.length > 0) {
            await machine.setWorkstations(workstationIds);
        } else {
            await machine.setWorkstations([]); // Clear associations if no workstation IDs provided
        }

        res.status(200).json(machine);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteMachine = async (req, res) => {
    try {
        const machine = await db.Machine.findByPk(req.params.id);
        if (!machine) {
            return res.status(404).json({ error: 'Machine not found' });
        }

        await machine.destroy();
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
