const { DataTypes } = require('sequelize');

const sequelize = require('../configs/database.config');

const InventoryAudit = sequelize.define(
    'InventoryAudit',
    {
        audit_id: {
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
        actual_quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        system_quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        audit_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        employee_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        note: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        tableName: 'inventory_audit',
        timestamps: false,
    },
);

InventoryAudit.associate = (models) => {
    InventoryAudit.belongsTo(models.Product, {
        foreignKey: 'product_id',
    });
    InventoryAudit.belongsTo(models.Employee, {
        foreignKey: 'employee_id',
    });
    InventoryAudit.belongsTo(models.Warehouse, {
        foreignKey: 'warehouse_id',
    });
};

module.exports = InventoryAudit;
