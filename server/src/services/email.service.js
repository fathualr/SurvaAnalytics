import transporter from '../config/email.js';
import { registrationOTPTemplate } from '../utils/emailTemplates.js';

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
    console.error('Email error:', error);
    throw new Error('Failed to send OTP');
  }
};
