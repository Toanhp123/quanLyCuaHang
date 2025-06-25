const { DataTypes } = require('sequelize');

const sequelize = require('../configs/database.config');

const StockAdjustment = sequelize.define(
    'StockAdjustment',
    {
        adjustment_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        check_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        employee_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        adjustment_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        note: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        tableName: 'stock_adjustment',
        timestamps: false,
    },
);

StockAdjustment.associate = (models) => {
    StockAdjustment.hasMany(models.StockAdjustmentDetail, {
        foreignKey: 'adjustment_id',
    });

    StockAdjustment.belongsTo(models.Employee, {
        foreignKey: 'employee_id',
    });
    StockAdjustment.belongsTo(models.StockCheck, {
        foreignKey: 'check_id',
    });
};

module.exports = StockAdjustment;
