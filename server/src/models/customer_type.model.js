const { DataTypes } = require('sequelize');

const CustomerModel = require('./customer.model');
const sequelize = require('../configs/database.config');

const CustomerTypeModel = sequelize.define(
    'CustomerType',
    {
        customer_type_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        customer_type_name: {
            type: DataTypes.STRING(10),
            allowNull: false,
            unique: true,
        },
    },
    {
        tableName: 'customer_type',
        timestamps: false,
    },
);

CustomerTypeModel.associate = (models) => {
    CustomerTypeModel.hasMany(models.Customer, {
        foreignKey: 'customer_type_id',
    });
};

module.exports = CustomerTypeModel;
