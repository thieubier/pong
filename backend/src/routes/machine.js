const express = require('express');
const router = express.Router();
const machineController = require('../controllers/machineController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/', authenticateToken, machineController.getAllMachines);
router.post('/', authenticateToken, machineController.createMachine);

router.get('/:id', authenticateToken, machineController.getMachineById);
router.put('/:id', authenticateToken, machineController.updateMachine);
router.delete('/:id', authenticateToken, machineController.deleteMachine);

module.exports = router;