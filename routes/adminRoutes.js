const express = require('express');
const { manageUsers, updateUser, deleteUser, manageCharities, approveCharity, rejectCharity } = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const router = express.Router();

router.use(authMiddleware);
router.use(adminMiddleware);

router.get('/users', manageUsers);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.get('/charities', manageCharities);
router.put('/charities/:id/approve', approveCharity);
router.delete('/charities/:id/reject', rejectCharity);

module.exports = router;
