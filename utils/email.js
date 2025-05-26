import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export async function sendAlertEmail(to, subject, text) {
  try {
    await transporter.sendMail({
      from: `"Fire Eyes" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text
    });
    console.log(`[EMAIL] Sent to ${to} | Subject: ${subject}`);
  } catch (err) {
    console.error(`[EMAIL ERROR] Failed to send to ${to}:`, err.message);
  }
}