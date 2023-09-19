import { connectMongoDB } from '../../../lib/mongodb';
import User from '../../../models/user';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { email, verification_code } = req.body;
      
      if (!email || !verification_code) {
        return res.status(400).json({ message: 'Email and verification code are required.' });
      }

      await connectMongoDB();
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      if (user.verified) {
        return res.status(200).json({ message: 'User is already verified.' });
      }

      if (user.verification_code === verification_code) {
        user.verified = true;
        await user.save();
        return res.status(200).json({ message: 'Email verified successfully.' });
      } else {
        return res.status(400).json({ message: 'Invalid verification code.' });
      }
    } catch (error) {
      console.error('An error occurred while verifying the email:', error);
      return res.status(500).json({ message: 'An error occurred while verifying the email.' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed.' });
  }
}
