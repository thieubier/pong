// backend/src/controllers/qualificationController.js
const db = require('../models');

exports.getAllQualifications = async (req, res) => {
    try {
        const qualifications = await db.WorkerQualification.findAll({
            include: [
                { model: db.User, as: 'User' },
                { model: db.Workstation, as: 'Workstation' }
            ]
        });
        res.status(200).json(qualifications);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createQualification = async (req, res) => {
    try {
        const { user_id, workstation_id } = req.body;
        const qualification = await db.WorkerQualification.create({ user_id, workstation_id });
        res.status(201).json(qualification);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getQualificationById = async (req, res) => {
    try {
        const qualification = await db.WorkerQualification.findByPk(req.params.id);
        if (!qualification) {
            return res.status(404).json({ error: 'Qualification not found' });
        }
        res.status(200).json(qualification);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateQualification = async (req, res) => {
    try {
        const qualification = await db.WorkerQualification.findByPk(req.params.id);
        if (!qualification) {
            return res.status(404).json({ error: 'Qualification not found' });
        }
        await qualification.update(req.body);
        res.status(200).json(qualification);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteQualification = async (req, res) => {
    try {
        const qualification = await db.WorkerQualification.findByPk(req.params.id);
        if (!qualification) {
            return res.status(404).json({ error: 'Qualification not found' });
        }
        await qualification.destroy();
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
