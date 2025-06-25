const { DataTypes } = require('sequelize');

const sequelize = require('../configs/database.config');

const Product = sequelize.define(
    'Product',
    {
        product_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        product_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        product_description: {
            type: DataTypes.TEXT,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        product_status_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        product_type_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        supplier_id: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
    },
    {
        tableName: 'product',
        timestamps: false,
    },
);

Product.associate = (models) => {
    Product.hasMany(models.Inventory, {
        foreignKey: 'product_id',
    });
    Product.hasMany(models.DamagedGood, {
        foreignKey: 'product_id',
    });
    Product.hasMany(models.ProductImage, {
        foreignKey: 'product_id',
    });
    Product.hasMany(models.PromotionRule, {
        foreignKey: 'product_id',
    });
    Product.hasMany(models.InvoiceDetail, {
        foreignKey: 'product_id',
    });
    Product.hasMany(models.InventoryAudit, {
        foreignKey: 'product_id',
    });
    Product.hasMany(models.PromotionEffect, {
        foreignKey: 'product_id',
    });
    Product.hasMany(models.PromotionProduct, {
        foreignKey: 'product_id',
    });
    Product.hasMany(models.StockCheckDetail, {
        foreignKey: 'product_id',
    });
    Product.hasMany(models.WarehouseExportItem, {
        foreignKey: 'product_id',
    });
    Product.hasMany(models.WarehouseReceiptItem, {
        foreignKey: 'product_id',
    });
    Product.hasMany(models.StockAdjustmentDetail, {
        foreignKey: 'product_id',
    });

    Product.belongsTo(models.Supplier, {
        foreignKey: 'supplier_id',
    });
    Product.belongsTo(models.ProductType, {
        foreignKey: 'product_type_id',
    });
    Product.belongsTo(models.ProductStatus, {
        foreignKey: 'product_status_id',
    });
};

module.exports = Product;
