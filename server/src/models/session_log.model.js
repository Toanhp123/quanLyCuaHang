const { DataTypes } = require('sequelize');

const sequelize = require('../configs/database.config');

const SessionLog = sequelize.define(
    'SessionLog',
    {
        session_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        account_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        login_time: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        logout_time: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        ip_address: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        isValid: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 1,
        },
    },
    {
        tableName: 'session_log',
        timestamps: false,
    },
);

SessionLog.associate = (models) => {
    SessionLog.belongsTo(models.Account, { foreignKey: 'account_id' });
};

module.exports = SessionLog;
