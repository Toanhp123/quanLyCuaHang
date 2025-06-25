const { DataTypes } = require('sequelize');

const sequelize = require('../configs/database.config');

const Account = sequelize.define(
    'Account',
    {
        account_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        password_hash: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        account_type: {
            type: DataTypes.ENUM('employee', 'customer'),
            allowNull: false,
        },
        employee_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            unique: true,
        },
        customer_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            unique: true,
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        account_status: {
            type: DataTypes.ENUM('pending', 'approved', 'rejected'),
            allowNull: false,
            defaultValue: 'approved',
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        create_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        tableName: 'account',
        timestamps: false,
    },
);

Account.associate = (models) => {
    Account.belongsTo(models.AccountRole, { foreignKey: 'role_id' });
    Account.belongsTo(models.Employee, { foreignKey: 'employee_id' });
    Account.belongsTo(models.Customer, { foreignKey: 'customer_id' });

    Account.hasMany(models.SessionLog, { foreignKey: 'account_id' });
};

module.exports = Account;
