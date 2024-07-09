const jwt = require('jsonwebtoken');
const db = require('../models');


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden
        }

        try {
            const dbUser = await db.User.findByPk(user.userId); // Assurez-vous que c'est user.userId
            if (!dbUser) {
                return res.status(404).json({ error: 'User not found in database' });
            }
            req.user = {
                id: dbUser.id, // Assurez-vous que req.user.id est défini
                role: dbUser.role
            };
            next();
        } catch (error) {
            console.log(error);
            return res.sendStatus(500); // Internal Server Error
        }
    });
};

const verifyToken = authenticateToken;

const isSupervisorOrAdmin = async (req, res, next) => {
    const userId = req.user.id;
    const userRole = req.user.role;
    const { id } = req.params;

    try {
        const range = await db.ManufacturingRange.findByPk(id);
        if (!range) {
            return res.status(404).send('Manufacturing range not found');
        }

        if (userRole !== 'admin' && range.supervisor_id !== userId) {
            console.log(range.supervisor_id, userId)
            return res.status(403).send('You do not have permission to modify this range');
        }

        next();
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    authenticateToken,
    verifyToken,
    isSupervisorOrAdmin
};
