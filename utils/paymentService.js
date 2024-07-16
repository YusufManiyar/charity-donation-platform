const Razorpay = require('razorpay')
const Donation = require('../models/Donation')
const Charity = require('../models/Charity')
const { sendDonationConfirmation } = require('../utils/emailService')

module.exports = {
    createTransaction : async (amount, userId, charityId) => {
        try {
    
           let rzp = new Razorpay({
            key_id: process.env.RAZORPAY_ID || 'rzp_test_AYcdF49UVvPrAR',
            key_secret: process.env.RAZORPAY_KEY_SECRET || 'KW1JRjFKrCsLsx2NJCrFSHia'
           })

           const donation = await rzp.orders.create({amount, currency: 'INR'})

            await Donation.create({donationId: donation.id, userId, charityId, status: 'PENDING'})
            return {donation, key_id: rzp.key_id}
        } catch (error) {
            throw error
        }
    },

    updateTransactionStatus :async (paymentId, donatationId) => {
        try {

            const donation = await Donation.findOne({where: {donatationId : donatationId}})
            await donation.update({paymentId: paymentId, status: 'SUCCESSFUL'})

            // Send confirmation email
            const charity = await Charity.findByPk(charityId);
            await sendDonationConfirmation(req.user.email, { amount, charityName: charity.name });

            return {success: true, message: 'Transaction Successful'}
        } catch (error) {
            throw error
        }
    }
}