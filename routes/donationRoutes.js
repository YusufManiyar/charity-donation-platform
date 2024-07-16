const express = require('express');
const { donate, confirmDonation } = require('../controllers/donationController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, donate);
router.post('/', authMiddleware, confirmDonation);

module.exports = router;
