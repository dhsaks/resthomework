const {
  connect,
  getCollection,
  insertItem,
  insertOne,
  deleteOne,
  updateOne,
  findOne,
  findOneAndDelete,
  findOneAndUpdate,
} = require('../mongo/dbHelpers');

const getAllOrders = (req, res) => {
  getCollection('saks', 'orders')
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send('Cannot get orders');
    });
};

const getByOrderId = (req, res) => {
  let query = { order_id: parseInt(req.params.order_id) };
  findOne('saks', 'orders', query)
    .then(data => {
      console.log(data);
      res.send(data);
    })
    .catch(err => {
      console.log(err);
    });
};

const postOrderAndUpdateInventory = (req, res) => {
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
  let orderNo = req.body.order_id;
  insertOne('saks', 'orders', order).then(data => {
    let query = { product_id: data.ops[0].product_id };
    findOne('saks', 'inventory', query).then(data => {
      let newInventory = data.count - order.count;
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
};

const updateOrderByOrderId = (req, res) => {
  let order = { order_id: parseInt(req.params.order_id) };
  let updates = {
    $set: {
      product_id: req.body.product_id,
      count: req.body.count,
      order_id: req.body.order_id,
      address: {
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
      },
    },
  };
  let prevCount;
  let productId = req.body.product_id;
  let orderCount = req.body.count;
  let query = { product_id: req.body.product_id };
  findOneAndUpdate('saks', 'orders', order, updates).then(data => {
    console.log('this is update one data', data);
    prevCount = data.value.count;
    findOne('saks', 'inventory', query).then(data => {
      let newInventory = data.count + prevCount - orderCount;
      let updates = {
        $set: {
          count: newInventory,
        },
      };
      updateOne('saks', 'inventory', query, updates)
        .then(data => {
          res.send(
            `Order Number ${
              req.params.order_id
            } has been delete. Inventory for product ${productId} is now ${newInventory}`
          );
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
};

const deleteOrderAndUpdateInventory = (req, res) => {
  let order = {
    order_id: parseInt(req.params.order_id),
  };
  let productId;
  let orderCount;
  let query = {};
  findOneAndDelete('saks', 'orders', order)
    .then(data => {
      productId = data.value.product_id;
      orderCount = data.value.count;
      query.product_id = productId;
    })
    .then(data => {
      findOne('saks', 'inventory', query).then(data => {
        let newInventory = data.count + orderCount;
        let updates = {
          $set: {
            count: newInventory,
          },
        };
        updateOne('saks', 'inventory', query, updates)
          .then(data => {
            res.send(
              `Order Number ${
                req.params.order_id
              } has been delete. Inventory for product ${productId} is now ${newInventory}`
            );
          })
          .catch(err => {
            console.log(err);
          });
      });
    });
};

module.exports = {
  getAllOrders: getAllOrders,
  getByOrderId: getByOrderId,
  postOrderAndUpdateInventory: postOrderAndUpdateInventory,
  updateOrderByOrderId: updateOrderByOrderId,
  deleteOrderAndUpdateInventory: deleteOrderAndUpdateInventory,
};
