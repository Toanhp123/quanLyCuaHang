const { DataTypes } = require('sequelize');

const sequelize = require('../configs/database.config');

const InvoiceDetail = sequelize.define(
    'InvoiceDetail',
    {
        invoice_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        product_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        promotion_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        unit_price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        discount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
        },
        unit_final_price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        is_gift: {
            type: DataTypes.ENUM('yes', 'no'),
            allowNull: false,
        },
    },
    {
        tableName: 'invoice_detail',
        timestamps: false,
    },
);

InvoiceDetail.associate = (models) => {
    InvoiceDetail.belongsTo(models.Invoice, { foreignKey: 'invoice_id' });
    InvoiceDetail.belongsTo(models.Product, { foreignKey: 'product_id' });
    InvoiceDetail.belongsTo(models.Promotion, { foreignKey: 'promotion_id' });
};

module.exports = InvoiceDetail;
