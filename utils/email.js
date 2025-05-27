import nodemailer from 'nodemailer';

console.log('[EMAIL] EMAIL_USER:', process.env.EMAIL_USER);
console.log('[EMAIL] EMAIL_PASS:', process.env.EMAIL_PASS ? '***HIDDEN***' : 'NOT SET');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // Correct for port 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

console.log('[EMAIL] Transporter config:', {
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  user: process.env.EMAIL_USER
});

export async function sendAlertEmail(to, subject, text, html = null) {
  try {
    console.log('[EMAIL] Sending email to:', to);
    let info = await transporter.sendMail({
      from: `"Fire Eyes" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      ...(html && { html })
    });
    console.log('[EMAIL] Sent:', info.messageId, 'to', to);
  } catch (err) {
    console.error('[EMAIL ERROR]', err.message);
  }
}