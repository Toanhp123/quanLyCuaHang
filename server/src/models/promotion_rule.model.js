const { DataTypes } = require('sequelize');

const sequelize = require('../configs/database.config');

const PromotionRule = sequelize.define(
    'PromotionRule',
    {
        rule_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        promotion_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        rule_type_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        rule_operator: {
            type: DataTypes.ENUM('>', '<', '==', '>=', '<='),
            allowNull: false,
        },
        rule_value: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        tableName: 'promotion_rule',
        timestamps: false,
    },
);

PromotionRule.associate = (models) => {
    PromotionRule.belongsTo(models.Product, {
        foreignKey: 'product_id',
    });
    PromotionRule.belongsTo(models.Promotion, {
        foreignKey: 'promotion_id',
    });
    PromotionRule.belongsTo(models.PromotionRuleType, {
        foreignKey: 'rule_type_id',
    });
};

module.exports = PromotionRule;
