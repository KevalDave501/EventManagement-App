const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const admin = sequelize.define('user', {
  u_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  u_name: {
    type: DataTypes.STRING(40),
    allowNull: false
  },
  u_email: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  u_password: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  r_type: {
    type: DataTypes.STRING(20),
    allowNull: false,
    default: "admin"
  },
  is_active: {
    type: DataTypes.BOOLEAN(),
    allowNull: false,
    default: '0'
  }
}, {
  tableName: 'user',
  timestamps: false
});

module.exports = admin;