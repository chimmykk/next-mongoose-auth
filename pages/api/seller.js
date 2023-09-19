// pages/api/seller.js

import { connectMongoDB } from '../../lib/mongodb';
import Seller from '../../models/seller';

export default async (req, res) => {
  const { query: { objectId } } = req;

  try {
    await connectMongoDB();

    const seller = await Seller.findById(objectId);

    if (seller) {
      res.status(200).json(seller);
    } else {
      res.status(404).json({ message: 'Seller not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
};
