import { connectMongoDB } from '../../../lib/mongodb';
import User from '../../../models/user';

export default async function handler(req, res) {
  await connectMongoDB();  // Connect to MongoDB

  if (req.method === 'GET') {
    try {
      const email = req.query.email.toLowerCase();
      console.log('Searching for email:', email);

      const user = await User.findOne({ email });

      if (user) {
        console.log('User found:', user);
        return res.json({ _id: user._id });
      } else {
        console.log('User not found');
        return res.json({ exists: false });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed.' });
  }
}
