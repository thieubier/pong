const express = require('express');
const router = express.Router();
const realizationHistoryController = require('../controllers/realizationHistoryController');

router.post('/', realizationHistoryController.createRealizationHistory);
router.get('/', realizationHistoryController.getAllRealizationHistories);
router.get('/:id', realizationHistoryController.getRealizationHistoryById);
router.put('/:id', realizationHistoryController.updateRealizationHistory);
router.delete('/:id', realizationHistoryController.deleteRealizationHistory);

module.exports = router;
