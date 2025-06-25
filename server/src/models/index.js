const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = require('../configs/database.config');

const db = {};

fs.readdirSync(__dirname)
    .filter((file) => file !== 'index.js' && file.endsWith('.js'))
    .forEach((file, index) => {
        const model = require(path.join(__dirname, file));
        db[model.name] = model;
        // console.log(`${index + 1}. Loaded model: ${model.name}`);
    });

// Setup associations sau khi load tất cả models
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
