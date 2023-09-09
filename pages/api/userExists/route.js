import { connectMongoDB } from "../../../lib/mongodb";
import User from "../../../models/user";

export default async function handler(req, res) {
  try {
    await connectMongoDB();
    const { email, username } = await req.body;

    // Check if either email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] }).select("_id");

    if (existingUser) {
      console.log("User already exists:", existingUser);
      res.status(200).json({ user: existingUser });
    } else {
      res.status(200).json({ user: null });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while checking for an existing user." });
  }
}
