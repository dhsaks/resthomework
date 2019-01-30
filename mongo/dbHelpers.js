const { MongoClient } = require('mongodb');

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
    coonnect(dbName, url)
      .then(db => {
        resolve(
          db
            .collection(collectionName)
            .find()
            .toArray()
        );
      })
      .catch(err => {
        reject(err);
      });
  });
};

// insert one document into the collection
const insertOne = (dbName, collectionName, item) => {
  return new Promise((resolve, reject) => {
    coonnect(dbName, url).then(db => {
      //   resolve(
      db.collection(collectionName)
        .insertOne(item)
        .then(result => {
          resolve(result);
        })
        .cathc(err => {
          res.send(err);
        });
      //   );
    });
  });
};

// find one document in the collection
const findOne = (dbName, collectionName, item) => {
  return new Promise((resolve, reject) => {
    coonnect(dbName, url).then(db => {
      // find one ex. { product_name: productName }
      resolve(db.collection(collectionName).findOne(item));
    });
  });
};

// delete one document in the collection
const deleteOne = (dbName, collectionName, item) => {
  return new Promise((resolve, reject) => {
    coonnect(dbName, url)
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

// upate one document in the collection
const updateOne = (dbName, collectionName, query, update) => {
  return new Promise((resolve, reject) => {
    coonnect(dbName, url)
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
  coonnect: connect,
  getCollection: getCollection,
  findOne: findOne,
  insertOne: insertOne,
  deleteOne: deleteOne,
  updateOne: updateOne,
};
