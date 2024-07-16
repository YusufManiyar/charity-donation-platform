const express = require('express');
const { registerCharity, updateCharity, createImpactReport, getImpactReports } = require('../controllers/charityController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', authMiddleware, registerCharity);
router.put('/:id', authMiddleware, updateCharity);
router.post('/:charityId/reports', authMiddleware, createImpactReport);
router.get('/:charityId/reports', authMiddleware, getImpactReports);

module.exports = router;
