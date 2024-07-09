// backend/src/controllers/userController.js
const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = db.User;

exports.register = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await db.User.create({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
            role: req.body.role,
        });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await db.User.findOne({ where: { username } });
        if (!user) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        const token = jwt.sign({ userId: user.id, role: user.role },
            process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token, role: user.role });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.getAllUsers = async (req, res) => {
    try {
        const users = await db.User.findAll();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getMe = async (req, res) => {
    try {
        const user = await db.User.findByPk(req.user.id, {
            attributes: ['id','username', 'email', 'role']
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.getUserById = async (req, res) => {
    try {
        const user = await db.User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { username, email, role } = req.body;
        const user = await db.User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        await user.update({ username, email, role });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};