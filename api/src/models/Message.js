/** @module ModelMessage */

const { model, Schema } = require('mongoose');

const MessageSchema = new Schema({
  value: {
    type: String
  },
  from: {
    type: String
  },
}, {
  timestamps: true
});

module.exports = model('Message', MessageSchema);
