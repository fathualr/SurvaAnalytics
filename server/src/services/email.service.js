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
    throw { status: 500, message: 'Failed to send OTP' };
  }
};
