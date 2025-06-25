const { DataTypes } = require('sequelize');

const sequelize = require('../configs/database.config');

const Customer = sequelize.define(
    'Customer',
    {
        customer_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        first_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        phone_number: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        customer_type_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        customer_birthday: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        tableName: 'customer',
        timestamps: false,
    },
);

Customer.associate = (models) => {
    Customer.hasOne(models.Account, { foreignKey: 'customer_id' });
    Customer.hasMany(models.Invoice, { foreignKey: 'customer_id' });
    Customer.hasMany(models.CustomerPromotion, { foreignKey: 'customer_id' });

    Customer.belongsTo(models.CustomerType, { foreignKey: 'customer_type_id' });
};

module.exports = Customer;
