const { DataTypes } = require('sequelize');

const sequelize = require('../configs/database.config');

const Invoice = sequelize.define(
    'Invoice',
    {
        invoice_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        customer_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        employee_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        promotion_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        discount_amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
        },
        invoice_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        total_amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        total_final_amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('pending', 'paid', 'cancelled', 'refunded'),
            allowNull: false,
            defaultValue: 'pending',
        },
    },
    {
        tableName: 'invoices',
        timestamps: true,
    },
);

Invoice.associate = (models) => {
    Invoice.hasMany(models.InvoiceDetail, {
        foreignKey: 'invoice_id',
        as: 'details',
    });

    Invoice.belongsTo(models.Customer, { foreignKey: 'customer_id' });
    Invoice.belongsTo(models.Employee, { foreignKey: 'employee_id' });
    Invoice.belongsTo(models.Promotion, { foreignKey: 'promotion_id' });
};

module.exports = Invoice;
