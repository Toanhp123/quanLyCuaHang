const { DataTypes } = require('sequelize');

const sequelize = require('../configs/database.config');

const Employee = sequelize.define(
    'Employee',
    {
        employee_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        employee_first_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        employee_phone: {
            type: DataTypes.STRING(15),
            allowNull: false,
            unique: true,
        },
        employee_birthday: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        employee_address: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        employee_hire_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        position_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        employee_last_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
    },
    {
        tableName: 'employee',
        timestamps: false,
    },
);

Employee.associate = (models) => {
    Employee.hasOne(models.Account, { foreignKey: 'employee_id' });
    Employee.hasMany(models.Invoice, { foreignKey: 'employee_id' });
    Employee.hasMany(models.Warehouse, { foreignKey: 'employee_id' });
    Employee.hasMany(models.StockCheck, { foreignKey: 'employee_id' });
    Employee.hasMany(models.DamagedGood, { foreignKey: 'employee_id' });
    Employee.hasMany(models.WorkSchedule, { foreignKey: 'employee_id' });
    Employee.hasMany(models.InventoryAudit, { foreignKey: 'employee_id' });
    Employee.hasMany(models.WarehouseExport, { foreignKey: 'employee_id' });
    Employee.hasMany(models.StockAdjustment, { foreignKey: 'employee_id' });
    Employee.hasMany(models.WarehouseReceipt, { foreignKey: 'employee_id' });

    Employee.belongsTo(models.EmployeePosition, { foreignKey: 'position_id' });
};

module.exports = Employee;
