const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const event = sequelize.define('event', {
    e_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    e_name: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    e_vanue: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    e_startdate: {
        type: DataTypes.DATE(),
        allowNull: true
    },
    e_enddate: {
        type: DataTypes.DATE(),
        allowNull: false,
    },
    u_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    e_capacity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'event',
    timestamps: false
});

module.exports = event;
