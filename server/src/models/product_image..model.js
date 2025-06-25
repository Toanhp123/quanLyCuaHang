const { DataTypes } = require('sequelize');

const sequelize = require('../configs/database.config');

const ProductImage = sequelize.define(
    'ProductImage',
    {
        image_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        image_url: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        is_main: {
            type: DataTypes.TINYINT(1),
            defaultValue: 0,
            allowNull: false,
        },
        uploaded_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        tableName: 'product_image',
        timestamps: false,
    },
);

ProductImage.associate = (models) => {
    ProductImage.belongsTo(models.Product, {
        foreignKey: 'product_id',
    });
};

module.exports = ProductImage;
