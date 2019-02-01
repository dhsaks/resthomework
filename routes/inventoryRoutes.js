const express = require('express');
const {
  getAllInventory,
  getInventoryByProductId,
  addInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
} = require('../controllers/inventoryController');

const inventoryRouter = express.Router();

inventoryRouter.get('/', getAllInventory);
inventoryRouter.get('/:product_id', getInventoryByProductId);
inventoryRouter.post('/', addInventoryItem);
inventoryRouter.put('/:product_id', updateInventoryItem);
inventoryRouter.delete('/:product_id', deleteInventoryItem);

module.exports = inventoryRouter;
