const express = require('express');
const bodyParser = require('body-parser');
const {
  getAllOrders,
  getByOrderId,
  postOrderAndUpdateInventory,
  deleteOrderAndUpdateInventory,
} = require('../controllers/orderConroller');

const orderRouter = express.Router();

orderRouter.get('/', getAllOrders);
orderRouter.get('/:order_id', getByOrderId);
orderRouter.post('/', postOrderAndUpdateInventory);
orderRouter.delete('/:order_id', deleteOrderAndUpdateInventory);

module.exports = orderRouter;
