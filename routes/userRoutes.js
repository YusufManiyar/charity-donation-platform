const express = require('express');
const { getDonationHistory } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/donations', authMiddleware, getDonationHistory);

module.exports = router;
