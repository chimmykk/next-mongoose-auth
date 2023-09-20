import { connectMongoDB } from "../../../lib/mongodb";
import User from "../../../models/user";

export default async function handler(req, res) {
  try {
    // Connect to MongoDB
    await connectMongoDB();

    if (req.method === 'GET') {
      const { email } = req.query;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const bannerImage = user.bannerImage; 
      return res.status(200).json({ bannerImage });  
    } else if (req.method === 'POST') {
      const { objectId, bannerImageData } = req.body; 

      const user = await User.findById(objectId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.bannerImage = bannerImageData; 
      await user.save();

      return res.status(200).json({ message: 'Banner image updated successfully' });  
    } else {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
