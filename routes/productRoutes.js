const express = require('express');
const bodyParser = require('body-parser');
const { connect, getCollection, insertItem, insertOne, deleteOne, updateOne } = require('../mongo/dbHelpers');

var productRouter = express.Router();

productRouter.get('/', (req, res) => {
  getCollection('saks', 'products').then(data => {
    res.send(data);
    console.log('data', data);
  });
});

productRouter.post('/', (req, res) => {
  console.log(req.body);
  let item = {
    product_name: req.body.product_name,
    designer: req.body.designer,
    type: req.body.type,
    price: req.body.price,
    inventory: {
      product_id: req.body.product_id,
      count: req.body.count,
    },
  };
  insertOne('saks', 'products', item)
    .then(data => {
      console.log('data', data);
      res.send('item successfully added');
    })
    .catch(err => {
      console.log(err);
    });
});

productRouter.get('/:name', (req, res) => {
  let item = { product_name: req.params.name };
  findOne('saks', 'products', item)
    .then(data => {
      console.log('data', data);
      res.send(data);

      console.log(req.params.name);
      // res.send(data);
    })
    .catch(err => {
      console.log(err);
    });
});

productRouter.delete('/:name', (req, res) => {
  console.log(req.params.name);
  let item = { product_name: req.params.name };
  deleteOne('saks', 'products', item)
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });
});

productRouter.put('/:name', (req, res) => {
  res.set('Content-Type');
  let query = { product_name: req.params.name };
  let updates = {
    $set: {
      product_name: req.body.product_name,
      designer: req.body.designer,
      type: req.body.type,
      price: req.body.price,
      inventory: {
        product_id: req.body.product_id,
        count: req.body.count,
      },
    },
  };
  updateOne('saks', 'products', query, updates)
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = productRouter;
