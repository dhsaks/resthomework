const { connect, getCollection, insertItem, insertOne, deleteOne, updateOne, findOne } = require('../mongo/dbHelpers');

const getAllInventory = (req, res) => {
  getCollection('saks', 'inventory')
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send('cannot get inventory');
    });
};

const getInventoryByProductId = (req, res) => {
  let query = { product_id: parseInt(req.params.product_id) };
  findOne('saks', 'inventory', query)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err);
    });
};

const addInventoryItem = (req, res) => {
  let item = {
    product_id: req.body.product_id,
    count: req.body.count,
  };
  insertOne('saks', 'inventory', item)
    .then(data => {
      console.log('data', data);
      res.send('inventory successfully added');
    })
    .catch(err => {
      console.log(err);
    });
};

const updateInventoryItem = (req, res) => {
  console.log(req.params.product_id);
  let query = { product_id: parseInt(req.params.product_id) };
  let updates = {
    $set: {
      product_id: req.body.product_id,
      count: req.body.count,
    },
  };
  updateOne('saks', 'inventory', query, updates)
    .then(data => {
      res.send(`you have successfully updated inventory of product ${parseInt(req.params.product_id)}`);
    })
    .catch(err => {
      console.log(err);
    });
};

const deleteInventoryItem = (req, res) => {
  let query = { product_id: parseInt(req.params.product_id) };
  deleteOne('saks', 'inventory', query)
    .then(data => {
      res.send(`you have successfullly deleted inventory for product ${parseInt(req.params.product_id)}`);
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = {
  getAllInventory: getAllInventory,
  getInventoryByProductId: getInventoryByProductId,
  addInventoryItem: addInventoryItem,
  updateInventoryItem: updateInventoryItem,
  deleteInventoryItem: deleteInventoryItem,
};
