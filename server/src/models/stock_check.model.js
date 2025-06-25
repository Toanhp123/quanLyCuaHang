const { DataTypes } = require('sequelize');

const sequelize = require('../configs/database.config');

const StockCheck = sequelize.define(
    'StockCheck',
    {
        check_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        warehouse_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        employee_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        check_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        note: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM('pending', 'completed', 'adjusted'),
            allowNull: false,
            defaultValue: 'pending',
        },
    },
    {
        tableName: 'stock_check',
        timestamps: false,
    },
);

StockCheck.associate = (models) => {
    StockCheck.hasMany(models.StockAdjustment, {
        foreignKey: 'check_id',
    });
    StockCheck.hasMany(models.StockCheckDetail, {
        foreignKey: 'check_id',
    });

    StockCheck.belongsTo(models.Employee, {
        foreignKey: 'employee_id',
    });
    StockCheck.belongsTo(models.Warehouse, {
        foreignKey: 'warehouse_id',
    });
};

module.exports = StockCheck;
