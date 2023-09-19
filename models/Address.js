const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  landmark: {
    type: String,
  },
  contactno: {
    type: String,
    required: true,
  },
  objectId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
