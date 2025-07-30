import { Resend } from 'resend';
import dotenv from "dotenv"
dotenv.config() 

const resend = new Resend(process.env.RESEND_API_KEY || re_czwiDarw_B5ZQbVfuK4qrgTDwyPw9xLG7);

export const sendVerificationEmail = async (to, code) => {
  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to,
      subject: 'Your Verification Code',
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2 style="color: #6366f1;">Verify your email</h2>
          <p>Your verification code is:</p>
          <div style="font-size: 24px; font-weight: bold; margin: 10px 0;">${code}</div>
          <p>This code will expire in 10 minutes.</p>
        </div>
      `,
    });
  } catch (err) {
    console.error("Error sending email:", err);
    throw new Error("Failed to send verification email");
  }
};
