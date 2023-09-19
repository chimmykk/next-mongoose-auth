import { connectMongoDB } from '../../../lib/mongodb';
import Seller from '../../../models/seller';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const objectId = req.query.objectId;

    try {
      const seller = await Seller.findOne({ objectId });

      if (seller) {
        res.json({ success: true, seller });
      } else {
        res.status(404).json({ success: false, message: 'Seller not found.' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed.' });
  }
}

connectMongoDB().then(() => {
  console.log('Connected to MongoDB.');
});