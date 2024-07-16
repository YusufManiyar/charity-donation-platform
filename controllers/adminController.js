const User = require('../models/User');
const Charity = require('../models/Charity');

exports.manageUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    await user.update(req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    await user.destroy();
    res.json({ message: 'User deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.manageCharities = async (req, res) => {
  try {
    const charities = await Charity.findAll();
    res.json(charities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.approveCharity = async (req, res) => {
  try {
    const { id } = req.params;
    const charity = await Charity.findByPk(id);
    if (!charity) {
      return res.status(404).json({ error: 'Charity not found.' });
    }
    await charity.update({ approved: true });
    res.json({ message: 'Charity approved successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.rejectCharity = async (req, res) => {
  try {
    const { id } = req.params;
    const charity = await Charity.findByPk(id);
    if (!charity) {
      return res.status(404).json({ error: 'Charity not found.' });
    }
    await charity.destroy();
    res.json({ message: 'Charity rejected and deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
