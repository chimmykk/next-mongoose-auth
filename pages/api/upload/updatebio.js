
import { connectMongoDB } from "../../../lib/mongodb";
import User from "../../../models/user";

export default async function handler(req, res) {
  try {
    await connectMongoDB();

    if (req.method === 'GET') {
      const { email } = req.query;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const bio = user.bio;
      return res.status(200).json({ bio });
    } else if (req.method === 'POST') {
      const { email, bioText } = req.body;

      if (!email) {
        return res.status(400).json({ message: 'Email is required' });
      }

      // Update the user's bio
      await User.updateOne({ email }, { bio: bioText });

      return res.status(200).json({ message: 'Bio updated successfully' });
    } else {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
