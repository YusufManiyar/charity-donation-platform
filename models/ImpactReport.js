const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Charity = require('./Charity');

const ImpactReport = sequelize.define('ImpactReport', {
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  charityId: { type: DataTypes.INTEGER, references: { model: Charity, key: 'id' } },
});

ImpactReport.belongsTo(Charity, { foreignKey: 'charityId' });

module.exports = ImpactReport;
