const { DataTypes } = require('sequelize');

const sequelize = require('../configs/database.config');

const PromotionEffect = sequelize.define(
    'PromotionEffect',
    {
        effect_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        promotion_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        effect_type_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        effect_value: {
            type: DataTypes.STRING(255),
        },
        product_id: {
            type: DataTypes.INTEGER,
        },
    },
    {
        tableName: 'promotion_effect',
        timestamps: false,
    },
);

PromotionEffect.associate = (models) => {
    PromotionEffect.belongsTo(models.Product, {
        foreignKey: 'product_id',
    });
    PromotionEffect.belongsTo(models.Promotion, {
        foreignKey: 'promotion_id',
    });
    PromotionEffect.belongsTo(models.PromotionEffectType, {
        foreignKey: 'effect_type_id',
    });
};

module.exports = PromotionEffect;
