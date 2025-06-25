const { DataTypes } = require('sequelize');

const sequelize = require('../configs/database.config');

const Supplier = sequelize.define(
    'Supplier',
    {
        supplier_id: {
            type: DataTypes.STRING(10),
            primaryKey: true,
        },
        supplier_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
    },
    {
        tableName: 'supplier',
        timestamps: false,
    },
);

Supplier.associate = (models) => {
    Supplier.hasMany(models.Product, {
        foreignKey: 'supplier_id',
    });
    Supplier.hasMany(models.WarehouseReceipt, {
        foreignKey: 'supplier_id',
    });
};

module.exports = Supplier;
