// backend/src/routes/index.js
const express = require('express');
const router = express.Router();
const userRoutes = require('./user');
const pieceRoutes = require('./piece');
const manufacturingRangeRoutes = require('./manufacturingRange');


router.use('/users', userRoutes);
router.use('/pieces', pieceRoutes);
router.use('/manufacturing-ranges', manufacturingRangeRoutes);
router.use('/realizations', require('./realization'));

module.exports = router;
