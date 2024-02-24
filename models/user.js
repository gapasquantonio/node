
const getDb = require('../util/database').getDb;
const { c } = require('docker/src/languages');
const mongodb = require('mongodb');

class User {
  constructor(userName, email, cart, id) {
    this.name = userName;
    this.email = email;
    this.cart = cart; // { items: [] }
    this._id = id;


  }

  save() {
    const db = getDb();
    return db.collection('users').insertOne(this).then(result => { return result }).catch(err => { console.log(err); });
  }

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex(cp => {
      return cp.productId.toString() === product._id.toString();
    })
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];
    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({ productId: new mongodb.ObjectId(product._id), quantity: newQuantity });
    }
    const updatedCart = { items: updatedCartItems };
    const db = getDb();
    return db.collection('users').updateOne({ _id: this._id }, { $set: { cart: updatedCart } }).then(result => { return result }).catch(err => { console.log(err); });
  }

  static fetchUserById(userId) {
    const db = getDb();
    return db.collection('users').findOne({ _id: new mongodb.ObjectId(userId) }).then(product => { return product }).catch(err => { console.log(err); });

  }


}

module.exports = User;
