const Donation = require('../models/Donation');
const User = require('../models/User');

exports.getDonationHistory = async (req, res) => {
  try {
    const donations = await Donation.findAll({ where: { userId: req.user.id }, include: [User] });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
