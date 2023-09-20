import { connectMongoDB } from "../../../lib/mongodb";
import User from "../../../models/user";

export default async function handler(req, res) {
  try {
    // Connect to MongoDB
    await connectMongoDB();
// the request handle both post and get so it will determined the get/post request
    if (req.method === 'GET') {
    
      const { email } = req.query;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const profileImage = user.profileImage;
      return res.status(200).json({ profileImage });
    } else if (req.method === 'POST') {
      // here to handle the post to the collections
      const { objectId, imageData } = req.body;

      const user = await User.findById(objectId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.profileImage = imageData;
      await user.save();

      return res.status(200).json({ message: 'Profile image updated successfully' });
    } else {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
