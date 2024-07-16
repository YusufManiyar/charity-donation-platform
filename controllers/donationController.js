const { createTransaction, updateTransactionStatus } = require('../utils/paymentService')

exports.donate = async (req, res) => {
  try {
    const { amount, charityId } = req.body;

    const donation = await createTransaction(amount, req.user.id, charityId)

    res.status(201).json(donation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.confirmDonation = async (req, res) => {
    try {
      const { paymentId, donationId } = req.body;

      const donation = await updateTransactionStatus(paymentId, donationId)
  
      res.status(201).json(donation);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
