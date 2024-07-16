const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (to, subject, text) => {
  const msg = {
    to,
    from: 'noreply@charityplatform.com', // Use a verified sender
    subject,
    text,
  };
  await sgMail.send(msg);
};

const sendDonationConfirmation = async (userEmail, donationDetails) => {
  const subject = 'Donation Confirmation';
  const text = `Thank you for your donation of ${donationDetails.amount} to ${donationDetails.charityName}. Your support helps us achieve our mission.`;
  await sendEmail(userEmail, subject, text);
};

const sendCharityUpdate = async (userEmail, charityName, updateDetails) => {
  const subject = `Update from ${charityName}`;
  const text = `${charityName} has provided an update: ${updateDetails}`;
  await sendEmail(userEmail, subject, text);
};

const sendReminder = async (userEmail, reminderDetails) => {
  const subject = 'Reminder';
  const text = reminderDetails;
  await sendEmail(userEmail, subject, text);
};

module.exports = { sendDonationConfirmation, sendCharityUpdate, sendReminder };
