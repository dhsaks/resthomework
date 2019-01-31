const express = require('express');
const bodyParser = require('body-parser');
const { connect, getCollection, insertItem, insertOne, deleteOne, updateOne, findOne } = require('../mongo/dbHelpers');

const inventoryRouter = express.Router();

inventoryRouter.get('/', (req, res) => {
  getCollection('saks', 'inventory')
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send('cannot get inventory');
    });
});

inventoryRouter.get('/:product_id', (req, res) => {
  let query = { product_id: parseInt(req.params.product_id) };
  findOne('saks', 'inventory', query)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err);
    });
});

inventoryRouter.post('/', (req, res) => {
  let item = {
    product_id: req.body.product_id,
    count: req.body.count,
  };
  insertOne('saks', 'inventory', item)
    .then(data => {
      console.log('data', data);
      res.send('iventory successfully added');
    })
    .catch(err => {
      console.log(err);
    });
});

inventoryRouter.put('/:product_id', (req, res) => {
  console.log(req.params.product_id);
  let query = { product_id: req.params.product_id };
  let updates = {
    $set: {
      count: req.body.count,
    },
  };
  updateOne('saks', 'inventory', query, updates)
    .then(data => {
      //   console.log(data);
      res.redirect('/inventory');
    })
    .catch(err => {
      console.log(err);
    });
});

inventoryRouter.delete('/:product_id', (req, res) => {
  console.log(req.params.product_id);
  let query = { product_id: req.params.product_id };
  delete ('saks', 'inventory', query)
    .then(data => {
      //   console.log(data);
      res.redirect('/inventory');
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = inventoryRouter;
