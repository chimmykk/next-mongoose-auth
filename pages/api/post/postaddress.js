import { connectMongoDB } from '../../../lib/mongodb';
import Address from '../../../models/address';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await connectMongoDB();
      const { street, city, state, postalCode, country, landmark, contactno, objectId } = req.body;

      const newAddress = new Address({
        street,
        city,
        state,
        postalCode,
        country,
        landmark,
        contactno,
        objectId,
      });

      await newAddress.save();

      const successResponse = {
        message: 'Address created successfully.',
        address: newAddress,
      };
      res.status(201).json(successResponse);
    } catch (error) {
      console.error('An error occurred while creating the address:', error);
      const errorResponse = {
        message: 'An error occurred while creating the address.',
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
