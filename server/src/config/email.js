import nodemailer from 'nodemailer';

export const emailConfig = {
  host: process.env.SMTP_HOST ,
  port: parseInt(process.env.SMTP_PORT),
  secure: process.env.SMTP_USE_SSL === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  from: process.env.FROM_EMAIL,
};

const transporter = nodemailer.createTransport(emailConfig);

transporter.verify((error) => {
  if (error) {
    console.error('SMTP Connection Error:', error);
  } else {
    console.log('SMTP Server Ready');
  }
});

export default transporter;
