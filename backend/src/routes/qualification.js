const express = require('express');
const router = express.Router();
const qualificationController = require('../controllers/qualificationController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/', authenticateToken, qualificationController.getAllQualifications);
router.post('/', authenticateToken, qualificationController.createQualification);

router.get('/:id', authenticateToken, qualificationController.getQualificationById);
router.put('/:id', authenticateToken, qualificationController.updateQualification);
router.delete('/:id', authenticateToken, qualificationController.deleteQualification);

module.exports = router;