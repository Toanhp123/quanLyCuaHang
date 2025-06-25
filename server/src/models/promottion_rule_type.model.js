const { DataTypes } = require('sequelize');

const sequelize = require('../configs/database.config');

const PromotionRuleType = sequelize.define(
    'PromotionRuleType',
    {
        rule_type_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        rule_type_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        rule_type_description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        tableName: 'promotion_rule_type',
        timestamps: false,
    },
);

PromotionRuleType.associate = (models) => {
    PromotionRuleType.hasMany(models.PromotionRule, {
        foreignKey: 'rule_type_id',
    });
};

module.exports = PromotionRuleType;
