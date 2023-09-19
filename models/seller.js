import mongoose from 'mongoose';

const modelName = 'Seller';

const existingSellerModel = mongoose.models[modelName];

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

const Seller = existingSellerModel || mongoose.model(modelName, sellerSchema);

export default Seller;
