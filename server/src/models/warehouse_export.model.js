const { DataTypes } = require('sequelize');

const sequelize = require('../configs/database.config');

const WarehouseExport = sequelize.define(
    'WarehouseExport',
    {
        export_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        employee_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        export_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        reason: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        total_amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
    },
    {
        tableName: 'warehouse_export',
        timestamps: false,
    },
);

WarehouseExport.associate = (models) => {
    WarehouseExport.hasMany(models.WarehouseExportItem, {
        foreignKey: 'export_id',
    });

    WarehouseExport.belongsTo(models.Employee, {
        foreignKey: 'employee_id',
    });
};

module.exports = WarehouseExport;
