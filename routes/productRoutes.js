const express = require('express');
const {
  getAllProducts,
  getProductByName,
  postNewProduct,
  updateByProductName,
  deleteProductByProductName,
} = require('../controllers/productController');

const productRouter = express.Router();

productRouter.get('/', getAllProducts);
productRouter.get('/:product_name', getProductByName);
productRouter.post('/', postNewProduct);
productRouter.put('/:product_name', updateByProductName);
productRouter.delete('/:product_name', deleteProductByProductName);

module.exports = productRouter;
