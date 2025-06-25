const { DataTypes } = require('sequelize');

const sequelize = require('../configs/database.config');

const EmployeePosition = sequelize.define(
    'EmployeePosition',
    {
        employee_position_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        employee_position_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        employee_position_description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        tableName: 'employee_position',
        timestamps: false,
    },
);

EmployeePosition.associate = (models) => {
    EmployeePosition.hasMany(models.Employee, { foreignKey: 'position_id' });
};

module.exports = EmployeePosition;
