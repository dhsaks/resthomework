const express = require('express');
const bodyParser = require('body-parser');
const { connect, getCollection, insertItem, insertOne, deleteOne, updateOne, findOne } = require('../mongo/dbHelpers');

const productRouter = express.Router();

productRouter.get('/', (req, res) => {
  getCollection('saks', 'products')
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send('Cannot get product');
    });
});

productRouter.get('/:product_name', (req, res) => {
  let item = { product_name: req.params.product_name };
  findOne('saks', 'products', item)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err);
    });
});

productRouter.post('/', (req, res) => {
  console.log(req.body);
  let item = {
    product_name: req.body.product_name,
    designer: req.body.designer,
    type: req.body.type,
    price: req.body.price,
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

productRouter.put('/:product_name', (req, res) => {
  let query = { product_name: req.params.product_name };
  let updates = {
    $set: {
      product_name: req.body.product_name,
      designer: req.body.designer,
      type: req.body.type,
      price: req.body.price,
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

productRouter.delete('/:product_name', (req, res) => {
  console.log(req.params.name);
  let item = { product_name: req.params.product_name };
  deleteOne('saks', 'products', item)
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = productRouter;
