import mongoose from 'mongoose';

const sellerSchema = new mongoose.Schema({
  category: String,
  subcategory: String,
  returnAddress: {
    addressLine1: String,
    addressLine2: String,
    state: String,
    city: String,
    country: String,
  },
  identityInfo: {
    identityVerification: String,
    identityVerificationId: String,
  },
  objectId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  }
});

// Define the model using the schema
const Seller = mongoose.model('Seller', sellerSchema);

export default Seller;
