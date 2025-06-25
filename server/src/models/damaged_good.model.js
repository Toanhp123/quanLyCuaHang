const { DataTypes } = require('sequelize');

const sequelize = require('../configs/database.config');

const DamagedGood = sequelize.define(
    'DamagedGood',
    {
        damaged_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        warehouse_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        reason: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        report_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        employee_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: 'damaged_goods',
        timestamps: false,
    },
);

DamagedGood.associate = (models) => {
    DamagedGood.belongsTo(models.Product, {
        foreignKey: 'product_id',
    });
    DamagedGood.belongsTo(models.Employee, {
        foreignKey: 'employee_id',
    });
    DamagedGood.belongsTo(models.Warehouse, {
        foreignKey: 'warehouse_id',
    });
};

module.exports = DamagedGood;
