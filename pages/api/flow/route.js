import { connectMongoDB } from '../../../lib/mongodb';
import Seller from '../../../models/seller';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await connectMongoDB();
      
      const {
        category,
        subcategory,
        returnAddress,
        identityInfo,
        objectId
      } = req.body;

      const newSeller = new Seller({
        category,
        subcategory,
        returnAddress,
        identityInfo,
        objectId
      });

      await newSeller.save();

      const successResponse = {
        message: 'Seller data saved successfully.',
        seller: newSeller,
      };

      res.status(201).json(successResponse);
    } catch (error) {
      console.error('An error occurred while saving seller data:', error);

      const errorResponse = {
        message: 'An error occurred while saving seller data.',
      };

      res.status(500).json(errorResponse);
    }
  } else {
    const notAllowedResponse = {
      message: 'Method not allowed.',
    };
    
    res.status(405).json(notAllowedResponse);
  }
}
