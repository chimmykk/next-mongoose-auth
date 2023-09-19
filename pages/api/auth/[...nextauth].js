import { connectMongoDB } from "../../../lib/mongodb";
import User from "../../../models/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        try {
          await connectMongoDB();
          const user = await User.findOne({ email: credentials.email });

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!passwordsMatch) {
            return null;
          }

          return user;
        } catch (error) {
          console.error("Error during authorization:", error);
          throw new Error("Authorization failed");
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
  callbacks: {
    async signIn({ user, account }) {
      try {
        await connectMongoDB();

        if (account.provider === "google") {
          const existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            // Create a user with necessary properties for Google-authenticated users
            await User.create({
              name: user.name,
              email: user.email,
              password: null,
              verification_token: null,
              verification_code: null,
              verified: true,
              phone: null,
              image:null,      // Assuming Google-authenticated users are already verified
            });
          }
        } else {
          const existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            // Create a user with necessary properties for other providers
            await User.create({
              name: user.name,
              email: user.email,
              verified: true,
            });
          }
        }
      } catch (error) {
        console.error("Error during sign-in:", error);
        throw new Error("Sign-in failed");
      }

      return true;
    },
  },
};

export default (req, res) => NextAuth(req, res, authOptions);