const { DataTypes } = require('sequelize');

const sequelize = require('../configs/database.config');

const StockCheckDetail = sequelize.define(
    'StockCheckDetail',
    {
        check_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        product_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        actual_quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        system_quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        difference: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: 'stock_check_detail',
        timestamps: false,
    },
);

StockCheckDetail.associate = (models) => {
    StockCheckDetail.belongsTo(models.StockCheck, {
        foreignKey: 'check_id',
    });
    StockCheckDetail.belongsTo(models.Product, {
        foreignKey: 'product_id',
    });
};

module.exports = StockCheckDetail;
