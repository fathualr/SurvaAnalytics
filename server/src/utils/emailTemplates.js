export const registrationOTPTemplate = (otp) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2 style="color: #2563eb;">Verifikasi Email Anda</h2>
    <p>Gunakan kode OTP berikut untuk melanjutkan pendaftaran di SurvaAnalytics:</p>
    <div style="background: #f3f4f6; padding: 16px; text-align: center; font-size: 24px; letter-spacing: 8px; margin: 24px 0;">
      ${otp}
    </div>
    <p style="color: #6b7280; font-size: 14px;">
      Kode ini akan kadaluarsa dalam 3 menit. Jangan berikan kode ini ke siapapun.
    </p>
  </div>
`;
