const ImpactReport = require('../models/ImpactReport');
const { sendCharityUpdate } = require('../utils/emailService');
const Charity = require('../models/Charity')
const User = require('../models/User')

exports.registerCharity = async (req, res) => {
  try {
    const charity = await Charity.create(req.body);
    res.status(201).json(charity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCharity = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params, req.body)
    const charity = await Charity.findByPk(id);
    if (!charity) {
      return res.status(404).json({ error: 'Charity not found.' });
    }
    await charity.update(req.body);
    res.json(charity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.createImpactReport = async (req, res) => {
  try {
    const report = await ImpactReport.create({ ...req.body, charityId: req.params.charityId });
    
    // Fetch charity and users to notify
    const charity = await Charity.findByPk(req.params.charityId);
    const users = await User.findAll(); // Assuming we notify all users for simplicity

    // Send update emails
    users.forEach(user => {
      sendCharityUpdate(user.email, charity.name, req.body.content);
    });

    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getImpactReports = async (req, res) => {
    try {
      const reports = await ImpactReport.findAll({ where: { charityId: req.params.charityId } });
      res.json(reports);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}  
