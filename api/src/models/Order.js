/** @module ModelOrder */

const { model, Schema } = require('mongoose');

const OrderSchema = new Schema({
  status: {
    type: String
  },
  products: [{
    name: String,
    quantity: Number
  }]
}, {
  timestamps: true
});

module.exports = model('Order', OrderSchema);
