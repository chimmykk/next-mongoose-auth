import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method not allowed
  }

  const { email, verification_token, verification_code } = req.body;

  try {
    const emailContent = `
      Your verification link is http://localhost:3000/api/verify?verification_token=${encodeURIComponent(verification_token)}
      Verification code: ${verification_code}
    `;

    const data = await resend.emails.send({
      from: 'trendzy@gmgmbot.com',
      to: [email],
      subject: 'Verification Email',
      text: emailContent,
    });

    res.status(200).json({ message: 'Verification email sent successfully' });
  } catch (error) {
    console.error('Error sending verification email:', error);
    res.status(500).json({ error: 'Failed to send verification email' });
  }
};