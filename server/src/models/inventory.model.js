const { DataTypes } = require('sequelize');

const sequelize = require('../configs/database.config');

const Inventory = sequelize.define(
    'Inventory',
    {
        product_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        warehouse_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        last_checked_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        tableName: 'inventory',
        timestamps: false,
    },
);

Inventory.associate = (models) => {
    Inventory.belongsTo(models.Product, {
        foreignKey: 'product_id',
    });
    Inventory.belongsTo(models.Warehouse, {
        foreignKey: 'warehouse_id',
    });
};

module.exports = Inventory;
