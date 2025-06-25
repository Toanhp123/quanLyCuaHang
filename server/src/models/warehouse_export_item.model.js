const { DataTypes } = require('sequelize');

const sequelize = require('../configs/database.config');

const WarehouseExportItem = sequelize.define(
    'WarehouseExportItem',
    {
        export_id: {
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
        tableName: 'warehouse_export_item',
        timestamps: false,
    },
);

WarehouseExportItem.associate = (models) => {
    WarehouseExportItem.belongsTo(models.Product, {
        foreignKey: 'product_id',
    });
    WarehouseExportItem.belongsTo(models.WarehouseExport, {
        foreignKey: 'export_id',
    });
};

module.exports = WarehouseExportItem;
