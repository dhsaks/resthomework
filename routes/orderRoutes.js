const express = require('express');
const {
  getAllOrders,
  getByOrderId,
  postOrderAndUpdateInventory,
  deleteOrderAndUpdateInventory,
  updateOrderByOrderId,
} = require('../controllers/orderConroller');

const orderRouter = express.Router();

orderRouter.get('/', getAllOrders);
orderRouter.get('/:order_id', getByOrderId);
orderRouter.post('/', postOrderAndUpdateInventory);
orderRouter.put('/:order_id', updateOrderByOrderId);
orderRouter.delete('/:order_id', deleteOrderAndUpdateInventory);

module.exports = orderRouter;
