import bcrypt from 'bcryptjs';
import User from '../../../models/user';
import { connectMongoDB } from '../../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { username, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      await connectMongoDB();
      await User.create({ username, email, password: hashedPassword });

      // Send a success response with a JSON message
      const successResponse = {
        message: 'User registered successfully.',
      };
      res.status(201).json(successResponse);
    } catch (error) {
      console.error('An error occurred while registering the user:', error);
      const errorResponse = {
        message: 'An error occurred while registering the user.',
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
