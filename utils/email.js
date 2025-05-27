import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // use false for port 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export async function sendAlertEmail(to, subject, text, html = null) {
  try {
    console.log('[EMAIL] Sending email to:', to);
    let info = await transporter.sendMail({
      from: '"FireEye" <' + process.env.EMAIL_USER + '>',
      to,
      subject,
      text,
      html: html || `<pre style="font-family:inherit">${text}</pre>`,
      headers: {
        'X-Mailer': 'Nodemailer',
        'X-Priority': '1 (Highest)',
        'X-MSMail-Priority': 'High'
      }
    });
    console.log('[EMAIL] Sent:', info.messageId, 'to', to);
  } catch (err) {
    console.error('[EMAIL ERROR]', err.message);
  }
}