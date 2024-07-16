const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Charity = require('./Charity');

const Donation = sequelize.define('Donation', {
  amount: { type: DataTypes.FLOAT, allowNull: false },
  userId: { type: DataTypes.INTEGER, references: { model: User, key: 'id' } },
  charityId: { type: DataTypes.INTEGER, references: { model: Charity, key: 'id' } },
  donationId: { type: DataTypes.INTEGER },
  paymentId: { type: DataTypes.INTEGER },
  status: { type: DataTypes.STRING }
});

Donation.belongsTo(User, { foreignKey: 'userId' });
Donation.belongsTo(Charity, { foreignKey: 'charityId' });

module.exports = Donation;
