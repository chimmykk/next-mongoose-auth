import { Resend } from 'resend';
import { connectMongoDB } from '../../../lib/mongodb';
import User from '../../../models/user';

const resend = new Resend(process.env.RESEND_API_KEY);

async function generateVerificationCode() {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  return code;
}

async function sendResetTokenByEmail(email, passwordResetToken) {
  try {
    const emailContent = `
      Your password reset code is: ${passwordResetToken}
    `;

    const data = await resend.emails.send({
      from: 'trendzy@gmgmbot.com',
      to: [email],
      subject: 'Password Reset Code',
      text: emailContent,
    });

    console.log('Password reset code sent successfully via email.');
  } catch (error) {
    console.error('Error sending password reset code via email:', error);
  }
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await connectMongoDB(); 

      const { email } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        const notFoundResponse = {
          message: 'Email not found.',
        };
        return res.status(404).json(notFoundResponse);
      }

      const verificationCode = await generateVerificationCode();
      user.passwordResetToken = verificationCode;
      user.passwordResetTokenExpiration = new Date(Date.now() + 5 * 60 * 1000);
      await user.save();

      console.log('Password Reset Token:', verificationCode);

      await sendResetTokenByEmail(email, verificationCode);

      console.log('Token saved successfully.'); 

      const successResponse = {
        message: 'Password reset code sent successfully.',
        user_id: user._id,
      };

      res.status(200).json(successResponse);
    } catch (error) {
      console.error('An error occurred while generating or saving reset code:', error);
      const errorResponse = {
        message: 'An error occurred while generating or saving reset code.',
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
