import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export async function sendAlertEmail(to, subject, text, html = null) {
  try {
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