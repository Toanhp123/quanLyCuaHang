const { DataTypes } = require('sequelize');

const sequelize = require('../configs/database.config');

const AccountRole = sequelize.define(
    'AccountRole',
    {
        role_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        role_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        role_description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        tableName: 'account_role',
        timestamps: false,
    },
);

AccountRole.associate = (models) => {
    AccountRole.hasMany(models.Account, { foreignKey: 'role_id' });
};

module.exports = AccountRole;
