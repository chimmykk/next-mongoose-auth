import express from 'express';
import { connectMongoDB } from './lib/mongodb';
import Seller from './models/seller';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/sellers/:objectId', async (req, res) => {
  const objectId = req.params.objectId;

  try {
    // Use the Seller model to find a seller
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
});

connectMongoDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
