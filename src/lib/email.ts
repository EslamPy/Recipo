import nodemailer from 'nodemailer';

// Configure email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export type SendEmailParams = {
  to: string;
  subject: string;
  html: string;
};

export async function sendEmail({ to, subject, html }: SendEmailParams) {
  try {
    const info = await transporter.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME || 'Recipo'}" <${process.env.EMAIL_FROM || 'noreply@recipo.com'}>`,
      to,
      subject,
      html,
    });

    console.log(`Email sent: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}

export function generateOTPEmailTemplate(otp: string) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #f59e0b;">Recipo</h1>
      </div>
      <div style="margin-bottom: 30px;">
        <h2 style="color: #333;">Verification Code</h2>
        <p style="color: #666; line-height: 1.5;">Please use the following code to verify your email:</p>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 4px; text-align: center; font-size: 24px; letter-spacing: 8px; font-weight: bold; margin: 20px 0;">
          ${otp}
        </div>
        <p style="color: #666; line-height: 1.5;">This code will expire in 5 minutes.</p>
      </div>
      <div style="border-top: 1px solid #e0e0e0; padding-top: 20px; font-size: 12px; color: #999; text-align: center;">
        <p>If you didn't request this code, you can safely ignore this email.</p>
        <p>&copy; ${new Date().getFullYear()} Recipo. All rights reserved.</p>
      </div>
    </div>
  `;
} 