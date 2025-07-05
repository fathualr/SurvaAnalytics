import transporter from '../config/email.js';
import { registrationOTPTemplate, opinionEmailTemplate } from '../utils/emailTemplates.js';

export const sendRegistrationOTP = async (email, otp) => {
  try {
    await transporter.sendMail({
      to: email,
      subject: 'Kode Verifikasi SurvaAnalytics',
      html: registrationOTPTemplate(otp),
      text: `Kode OTP Anda: ${otp} (berlaku 3 menit)`,
    });
    return true;
  } catch (error) {
    throw { status: 500, message: 'Failed to send OTP' };
  }
};

export const sendOpinionEmail = async ({ email, subject, message }) => {
  try {
    await transporter.sendMail({
      to: process.env.SMTP_USER,
      replyTo: email,
      subject: `[Opinion] ${subject}`,
      html: opinionEmailTemplate({ email, subject, message }),
      text: `New opinion from ${email}\n\nSubject: ${subject}\nMessage: ${message}`,
    });
    return { email, subject };
  } catch (error) {
    throw { status: 500, message: 'Failed to send opinion email' };
  }
};