const Sequelize = require('sequelize');

const sequelize = new Sequelize('empapp', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;