// verify email address // Fix the folder directory * 
import { connectMongoDB } from '../../lib/mongodb';
import User from '../../models/user';
export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { verification_token } = req.query;
      await connectMongoDB();
      const user = await User.findOne({ verification_token });
      if (!user) {
        return res.status(404).json({ message: 'User not found or already verified.' });
      }
      if (user.verified) {
        return res.status(200).json({ message: 'User is already verified.' });
      }
      user.verified = true;
      await user.save();
      return res.status(200).json({ message: 'Email verified successfully.' });
    } catch (error) {
      console.error('An error occurred while verifying the email:', error);
      return res.status(500).json({ message: 'An error occurred while verifying the email.' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed.' });
  }
}