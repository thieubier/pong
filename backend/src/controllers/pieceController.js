const db = require('../models');

exports.createPiece = async (req, res) => {
    const { reference, label, type, price, components } = req.body;

    try {
        const piece = await db.Piece.create({ reference, label, type, price });

        if (components && components.length > 0) {
            for (const component of components) {
                await db.PieceComposition.create({
                    parent_piece_id: piece.id,
                    component_piece_id: component.id,
                    quantity: component.quantity
                });
            }
        }

        res.status(201).json(piece);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllPieces = async (req, res) => {
    try {
        const pieces = await db.Piece.findAll();
        res.status(200).json(pieces);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getPieceById = async (req, res) => {
    try {
        const piece = await db.Piece.findByPk(req.params.id, {
            include: [
                {
                    model: db.PieceComposition,
                    as: 'Components',
                    include: {
                        model: db.Piece,
                        as: 'ComponentPiece'
                    }
                }
            ]
        });
        if (!piece) {
            return res.status(404).json({ error: 'Piece not found' });
        }
        res.status(200).json(piece);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updatePiece = async (req, res) => {
    try {
        const piece = await db.Piece.findByPk(req.params.id);
        if (!piece) {
            return res.status(404).json({ error: 'Piece not found' });
        }
        await piece.update(req.body);
        res.status(200).json(piece);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deletePiece = async (req, res) => {
    try {
        const piece = await db.Piece.findByPk(req.params.id);
        if (!piece) {
            return res.status(404).json({ error: 'Piece not found' });
        }

        // Supprimer les composants associés
        await db.PieceComposition.destroy({
            where: {
                parent_piece_id: piece.id
            }
        });

        await piece.destroy();
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
