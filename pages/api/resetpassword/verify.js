import bcrypt from 'bcryptjs';
import User from '../../../models/user';
import { connectMongoDB } from '../../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { code, newPassword } = req.body;
      await connectMongoDB();
      const user = await User.findOne({ passwordResetToken: code });

      if (!user) {
        return res.status(400).json({ message: 'Invalid password reset token.' });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await User.updateOne({ _id: user._id }, { $set: { password: hashedPassword } });

      const successResponse = {
        message: 'Password updated successfully.',
      };
      res.status(200).json(successResponse);
    } catch (error) {
      console.error('An error occurred while changing the password:', error);
      const errorResponse = {
        message: 'An error occurred while changing the password.',
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
