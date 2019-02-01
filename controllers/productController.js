const { connect, getCollection, insertItem, insertOne, deleteOne, updateOne, findOne } = require('../mongo/dbHelpers');

const getAllProducts = (req, res) => {
  getCollection('saks', 'products')
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send('Cannot get product');
    });
};

const getProductByName = (req, res) => {
  let item = { product_name: req.params.product_name };
  findOne('saks', 'products', item)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err);
    });
};

const postNewProduct = (req, res) => {
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
};

const updateByProductName = (req, res) => {
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
};

const deleteProductByProductName = (req, res) => {
  console.log(req.params.name);
  let item = { product_name: req.params.product_name };
  deleteOne('saks', 'products', item)
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = {
  getAllProducts: getAllProducts,
  getProductByName: getProductByName,
  postNewProduct: postNewProduct,
  updateByProductName: updateByProductName,
  deleteProductByProductName: deleteProductByProductName,
};
