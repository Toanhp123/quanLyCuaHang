const productService = require('../services/product.service');

class ProductController {
    // [GET] product/
    async getAllProduct(req, res, next) {
        res.json('hello');
    }
}

module.exports = new ProductController();
