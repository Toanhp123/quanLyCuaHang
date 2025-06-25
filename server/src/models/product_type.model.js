const { DataTypes } = require('sequelize');

const sequelize = require('../configs/database.config');

const ProductType = sequelize.define(
    'ProductType',
    {
        product_type_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        product_type_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
    },
    {
        tableName: 'product_type',
        timestamps: false,
    },
);

ProductType.associate = (models) => {
    ProductType.hasMany(models.Product, {
        foreignKey: 'product_type_id',
    });
};

module.exports = ProductType;
