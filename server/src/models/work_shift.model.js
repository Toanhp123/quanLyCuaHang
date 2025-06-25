const { DataTypes } = require('sequelize');

const sequelize = require('../configs/database.config');

const WorkShift = sequelize.define(
    'WorkShift',
    {
        shift_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        shift_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        start_time: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        end_time: {
            type: DataTypes.TIME,
            allowNull: false,
        },
    },
    {
        tableName: 'work_shift',
        timestamps: false,
    },
);

WorkShift.associate = (models) => {
    WorkShift.hasMany(models.WorkSchedule, {
        foreignKey: 'shift_id',
    });
};

module.exports = WorkShift;
