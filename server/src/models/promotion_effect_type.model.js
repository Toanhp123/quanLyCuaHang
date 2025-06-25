const { DataTypes } = require('sequelize');

const sequelize = require('../configs/database.config');

const PromotionEffectType = sequelize.define(
    'PromotionEffectType',
    {
        promotion_effect_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        effect_type_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        effect_type_description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        tableName: 'promotion_effect_type',
        timestamps: false,
    },
);

PromotionEffectType.associate = (models) => {
    PromotionEffectType.hasMany(models.PromotionEffect, {
        foreignKey: 'effect_type_id',
    });
};

module.exports = PromotionEffectType;
