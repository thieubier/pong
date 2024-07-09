const express = require('express');
const router = express.Router();
const realizationController = require('../controllers/realizationController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/', authenticateToken, realizationController.createRealizations);
router.get('/', authenticateToken, realizationController.getAllRealizations);

module.exports = router;
