const express = require('express');
const productRouter = express.Router();
const { createProduct, getProduct } = require('../../controllers/productController');


productRouter.post('/createProduct', createProduct);
productRouter.get('/getProduct', getProduct);

module.exports = productRouter;