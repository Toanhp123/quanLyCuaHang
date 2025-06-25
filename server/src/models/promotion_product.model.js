const { DataTypes } = require('sequelize');

const sequelize = require('../configs/database.config');

const PromotionProduct = sequelize.define(
    'PromotionProduct',
    {
        promotion_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        product_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
    },
    {
        tableName: 'promotion_product',
        timestamps: false,
    },
);

PromotionProduct.associate = (models) => {
    PromotionProduct.belongsTo(models.Promotion, {
        foreignKey: 'promotion_id',
    });
    PromotionProduct.belongsTo(models.Product, {
        foreignKey: 'product_id',
    });
};

module.exports = PromotionProduct;
