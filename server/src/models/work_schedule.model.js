const { DataTypes } = require('sequelize');

const sequelize = require('../configs/database.config');

const WorkSchedule = sequelize.define(
    'WorkSchedule',
    {
        work_schedule_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        work_day: {
            type: DataTypes.TINYINT,
            allowNull: false,
        },
        work_start_date: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        work_end_date: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        shift_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        employee_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: 'work_schedule',
        timestamps: false,
    },
);

WorkSchedule.associate = (models) => {
    WorkSchedule.belongsTo(models.Employee, {
        foreignKey: 'employee_id',
    });
    WorkSchedule.belongsTo(models.WorkShift, {
        foreignKey: 'shift_id',
    });
};

module.exports = WorkSchedule;
