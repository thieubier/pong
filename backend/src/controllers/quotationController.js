// backend/src/controllers/quotationController.js
const db = require('../models');

exports.createQuotation = async (req, res) => {
    try {
        const quotation = await db.Quotation.create(req.body, {
            include: [{ model: db.QuotationLine, as: 'QuotationLines' }]
        });
        res.status(201).json(quotation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllQuotations = async (req, res) => {
    try {
        const quotations = await db.Quotation.findAll({ include: 'QuotationLines' });
        res.status(200).json(quotations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getQuotationById = async (req, res) => {
    try {
        const quotation = await db.Quotation.findByPk(req.params.id, { include: 'QuotationLines' });
        if (!quotation) {
            return res.status(404).json({ error: 'Quotation not found' });
        }
        res.status(200).json(quotation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateQuotation = async (req, res) => {
    try {
        const quotation = await db.Quotation.findByPk(req.params.id);
        if (!quotation) {
            return res.status(404).json({ error: 'Quotation not found' });
        }
        await quotation.update(req.body);
        res.status(200).json(quotation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteQuotation = async (req, res) => {
    try {
        const quotation = await db.Quotation.findByPk(req.params.id);
        if (!quotation) {
            return res.status(404).json({ error: 'Quotation not found' });
        }
        await quotation.destroy();
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
