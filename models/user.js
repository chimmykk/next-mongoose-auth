import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: false, // Make password optional for Google-authenticated users
    },
    verification_token: {
      type: String,
      required: false, // Make verification_token optional for Google-authenticated users
    },
    verification_code: {
      type: String,
      required: false, // Make verification_code optional for Google-authenticated users
    },
    verified: {
      type: Boolean,
      required: false,
    },
    passwordResetToken: {
      type: String,
      default: null,
    },
    passwordResetTokenExpiration: {
      type: Date,
      default: null,
    },
    balance: {
      type: Number,
      default: 0,
    },
    phone: String,
    image: String,
    profileImage: String,  
    bannerImage: String,
    bio: String            
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
