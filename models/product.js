const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');
class Product {
  constructor(title, imageUrl, description, price, id, userId) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.userId = userId;
  }

  save() {
    const db = getDb();
    if (this._id) {

      return db.collection('products').updateOne({ _id: this._id }, { $set: this }).then(result => { return result }).catch(err => { console.log(err); });
    }
    return db.collection('products').insertOne(this).then(result => { return result }).catch(err => { console.log(err); });
  }

  static fetchAll() {
    const db = getDb();
    return db.collection('products').find().toArray().then(products => { return products }).catch(err => { console.log(err); });
  }
  static fetchProductById(prodId) {
    const db = getDb();
    return db.collection('products').find({ _id: new mongodb.ObjectId(prodId) }).next().then(product => { return product }).catch(err => { console.log(err); });

  }
  static deleteById(prodId) {
    const db = getDb();
    return db.collection('products').deleteOne({ _id: new mongodb.ObjectId(prodId) }).then(result => { return result }).catch(err => { console.log(err); });
  }


}



module.exports = Product;
