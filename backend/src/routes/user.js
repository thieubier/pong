// backend/src/routes/user.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');


router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/', userController.getAllUsers);
router.get('/me', authenticateToken, userController.getMe);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);



module.exports = router;
