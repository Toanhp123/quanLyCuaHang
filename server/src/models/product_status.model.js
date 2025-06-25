const { DataTypes } = require('sequelize');

const sequelize = require('../configs/database.config');

const ProductStatus = sequelize.define(
    'ProductStatus',
    {
        product_status_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        product_status_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
    },
    {
        tableName: 'product_status',
        timestamps: false,
    },
);

ProductStatus.associate = (models) => {
    ProductStatus.hasMany(models.Product, {
        foreignKey: 'product_status_id',
    });
};

module.exports = ProductStatus;
