const express = require('express');
const router = express.Router();
const manufacturingRangeController = require('../controllers/manufacturingRangeController');
const { authenticateToken, verifyToken, isSupervisorOrAdmin } = require('../middleware/authMiddleware');

router.get('/', authenticateToken, manufacturingRangeController.getAllManufacturingRanges);
router.post('/', verifyToken, manufacturingRangeController.createManufacturingRange);
router.get('/:id', authenticateToken, manufacturingRangeController.getManufacturingRangeById);
router.put('/:id', verifyToken, isSupervisorOrAdmin, manufacturingRangeController.updateManufacturingRange);
router.delete('/:id', verifyToken, isSupervisorOrAdmin, manufacturingRangeController.deleteManufacturingRange);

module.exports = router;
