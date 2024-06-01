// backend/sendEmail.js
import nodemailer from 'nodemailer';

const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'queries.taskify@gmail.com',
      pass: 'daamuokevjmtxlxq'
    }
  });

  try {
    await transporter.sendMail({
      from: 'queries.taskify@gmail.com',
      to,
      subject,
      html
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

export default sendEmail;
