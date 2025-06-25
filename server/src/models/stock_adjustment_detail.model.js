const { DataTypes } = require('sequelize');

const sequelize = require('../configs/database.config');

const StockAdjustmentDetail = sequelize.define(
    'StockAdjustmentDetail',
    {
        adjustment_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        product_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        adjustment_quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        reason: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        tableName: 'stock_adjustment_detail',
        timestamps: false,
    },
);

StockAdjustmentDetail.associate = (models) => {
    StockAdjustmentDetail.belongsTo(models.Product, {
        foreignKey: 'product_id',
    });
    StockAdjustmentDetail.belongsTo(models.StockAdjustment, {
        foreignKey: 'adjustment_id',
    });
};

module.exports = StockAdjustmentDetail;
