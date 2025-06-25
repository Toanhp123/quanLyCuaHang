const { DataTypes } = require('sequelize');

const sequelize = require('../configs/database.config');

const CustomerPromotion = sequelize.define(
    'CustomerPromotion',
    {
        customer_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        promotion_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
    },
    {
        tableName: 'customer_promotion',
        timestamps: false,
    },
);

CustomerPromotion.associate = (models) => {
    CustomerPromotion.belongsTo(models.Customer, { foreignKey: 'customer_id' });
    CustomerPromotion.belongsTo(models.Promotion, {
        foreignKey: 'promotion_id',
    });
};

module.exports = CustomerPromotion;
