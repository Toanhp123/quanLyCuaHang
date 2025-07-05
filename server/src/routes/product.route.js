const express = require('express');
const productController = require('../controllers/product.controller');

const route = express.Router();

route.get('/', productController.getAllProduct);

module.exports = route;
