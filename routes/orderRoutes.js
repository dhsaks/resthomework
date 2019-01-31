const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ObjectID } = require('mongodb');
const { connect, getCollection, insertItem, insertOne, deleteOne, updateOne, findOne } = require('../mongo/dbHelpers');

const orderRouter = express.Router();

orderRouter.get('/', (req, res) => {
  getCollection('saks', 'orders')
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send('Cannot get orders');
    });
});

orderRouter.get('/:order_id', (req, res) => {
  let query = { order_id: req.params.order_id };
  findOne('saks', 'order', query)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err);
    });
});

orderRouter.post('/', (req, res) => {
  let order = {
    product_id: req.body.product_id,
    count: req.body.count,
    order_id: req.body.order_id,
    address: {
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
    },
  };
  //   let query = { product_id: req.body.product_id };
  let orderNo = req.body.order_id;
  insertOne('saks', 'orders', order).then(data => {
    let query = { product_id: data.ops[0].product_id };
    findOne('saks', 'inventory', query).then(data => {
      let newInventory = data.count - order.count;
      //   console.log('new Inventory', typeof newInventory);
      let updates = {
        $set: {
          count: newInventory,
        },
      };
      updateOne('saks', 'inventory', query, updates)
        .then(data => {
          res.send(
            `Order Number ${orderNo} has been created. Inventory for product ${
              req.body.product_id
            } is now ${newInventory}`
          );
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
});

// TODO fix this route

// orderRouter.delete('/:order_id', (req, res) => {
//   let order = {
//     order_id: req.body.order_id,
//   };
//   let orderNo = req.body.order_id;
//   deleteOne('saks', 'orders', order).then(data => {
//     console.log(data);
//     res.redirect('/orders');
//   });
// });

module.exports = orderRouter;
