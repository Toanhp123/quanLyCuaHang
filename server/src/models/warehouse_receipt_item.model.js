const { DataTypes } = require('sequelize');

const sequelize = require('../configs/database.config');

const WarehouseReceiptItem = sequelize.define(
    'WarehouseReceiptItem',
    {
        receipt_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        product_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        unit_price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
    },
    {
        tableName: 'warehouse_receipt_item',
        timestamps: false,
    },
);

WarehouseReceiptItem.associate = (models) => {
    WarehouseReceiptItem.belongsTo(models.Product, {
        foreignKey: 'product_id',
    });
    WarehouseReceiptItem.belongsTo(models.WarehouseReceipt, {
        foreignKey: 'receipt_id',
    });
};

module.exports = WarehouseReceiptItem;
