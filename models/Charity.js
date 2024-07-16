const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Charity = sequelize.define('Charity', {
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  mission: { type: DataTypes.TEXT, allowNull: false },
  goals: { type: DataTypes.TEXT, allowNull: false },
});

module.exports = Charity;
