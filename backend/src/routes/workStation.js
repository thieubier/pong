// routes/workstations.js
const express = require('express');
const router = express.Router();
const workstationController = require('../controllers/workstationController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/', authenticateToken, workstationController.getAllWorkstations);
router.post('/', authenticateToken, workstationController.createWorkstation);

router.get('/:id', authenticateToken, workstationController.getWorkstationById);
router.put('/:id', authenticateToken, workstationController.updateWorkstation);
router.delete('/:id', authenticateToken, workstationController.deleteWorkstation);
router.get('/:id/machines', authenticateToken, workstationController.getMachinesByWorkstationId);



module.exports = router;