const { MongoClient, ObjectID } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';

// connect to db
const connect = (dbName, url) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(
      url,
      { useNewUrlParser: true },
      (err, client) => {
        if (err) {
          reject(err);
        } else {
          console.log('connection success');
          let db = client.db(dbName);
          resolve(db);
        }
        // client.close() will close connection, need to keep connection open
        // client.close();
      }
    );
  });
};

// get colletion and return all items
const getCollection = (dbName, collectionName) => {
  return new Promise((resolve, reject) => {
    connect(
      dbName,
      url
    )
      .then(db => {
        db.collection(collectionName)
          .find()
          .toArray()
          .then(result => {
            resolve(result);
          });
      })
      .catch(err => {
        reject(err);
      });
  });
};

// insert one document into the collection
const insertOne = (dbName, collectionName, item) => {
  return new Promise((resolve, reject) => {
    connect(
      dbName,
      url
    ).then(db => {
      db.collection(collectionName)
        .insertOne(item)
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  });
};

// find one document in the collection
const findOne = (dbName, collectionName, item) => {
  return new Promise((resolve, reject) => {
    connect(
      dbName,
      url
    ).then(db => {
      // find one ex. { product_name: productName }
      db.collection(collectionName)
        .findOne(item)
        .then(result => {
          resolve(result);
        });
    });
  }).catch(err => {
    reject(err);
  });
};

const findOneAndUpdate = (dbName, collectionName, query, update) => {
  return new Promise((resolve, reject) => {
    connect(
      dbName,
      url
    ).then(db => {
      // find one ex. { product_name: productName }
      db.collection(collectionName)
        .findOneAndUpdate(query, update)
        .then(result => {
          resolve(result);
        });
    });
  }).catch(err => {
    reject(err);
  });
};

// delete one document in the collection
const deleteOne = (dbName, collectionName, item) => {
  return new Promise((resolve, reject) => {
    connect(
      dbName,
      url
    )
      .then(db => {
        // find one ex. { product_name: productName }
        db.collection(collectionName)
          .deleteOne(item)
          .then(result => {
            resolve(result);
          });
      })
      .catch(err => {
        resolve(err);
      });
  });
};

// find one document and delete itdelete one document in the collection
const findOneAndDelete = (dbName, collectionName, item) => {
  return new Promise((resolve, reject) => {
    connect(
      dbName,
      url
    )
      .then(db => {
        // find one and Delete ex
        db.collection(collectionName)
          .findOneAndDelete(item)
          .then(result => {
            resolve(result);
          });
      })
      .catch(err => {
        resolve(err);
      });
  });
};

// upate one document in the collection
const updateOne = (dbName, collectionName, query, update) => {
  return new Promise((resolve, reject) => {
    connect(
      dbName,
      url
    )
      .then(db => {
        // query ex. { product_name: productName }
        // update
        db.collection(collectionName)
          .updateOne(query, update)
          .then(result => {
            resolve(result);
          });
      })
      .catch(err => {
        resolve(err);
      });
  });
};

module.exports = {
  connect: connect,
  getCollection: getCollection,
  findOne: findOne,
  findOneAndUpdate: findOneAndUpdate,
  insertOne: insertOne,
  deleteOne: deleteOne,
  updateOne: updateOne,
  findOneAndDelete: findOneAndDelete,
};
