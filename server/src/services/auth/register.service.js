import bcrypt from 'bcrypt';
import * as otpService from '../otp.service.js';
import * as emailservice from '../email.service.js';
import db from '../../models/index.js';
const { Pengguna } = db;

export const startRegistration = async (email) => {
  const existingUser = await Pengguna.findOne({ where: { email } });
  if (existingUser && existingUser.email_confirmed) {
    throw new Error('Email already registered');
  }

  const randomPassword = bcrypt.hashSync(Math.random().toString(36), 10);
  const otp = otpService.generateOTP();

  const [user, created] = await Pengguna.upsert({
    email,
    password: randomPassword,
    email_confirmed: false,
    email_confirmation_token: otp,
    email_confirmation_sent_at: new Date(),
    role: 'umum'
  }, {
    returning: true,
    where: { email }
  });

  await emailservice.sendRegistrationOTP(email, otp);
  return { email: user.email };
};
