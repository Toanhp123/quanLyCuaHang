const { Sequelize } = require('sequelize');

const envConfig = require('../configs/env.config');

const sequelize = new Sequelize(
    envConfig.DB_NAME,
    envConfig.DB_USER,
    envConfig.DB_PASS,
    {
        host: envConfig.DB_HOST,
        dialect: 'mysql',
        logging: false,
    },
);

module.exports = sequelize;
