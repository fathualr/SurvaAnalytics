import bcrypt from 'bcrypt';
import * as otpService from '../otp.service.js';
import * as emailservice from '../email.service.js';
import db from '../../models/index.js';
const { Pengguna, Umum, sequelize } = db;

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

export const validationOTP = async (email, otp) => {
  const user = await db.Pengguna.findOne({ where: { email } });
  
  if (!user || !otpService.isOTPValid(user, otp)) {
    throw new Error('Invalid or expired OTP');
  }
  
  return { userId: user.id };
};

export const completeRegistration = async (penggunaData) => {
  const pengguna = await Pengguna.findByPk(penggunaData.id);
  if (!pengguna) throw new Error("User not found");
  if (pengguna.email_confirmed) throw new Error("Registration already completed");

  const transaction = await sequelize.transaction();
  try {
    await Pengguna.update({
      password: await bcrypt.hash(penggunaData.password, 10),
      email_confirmed: true,
      email_confirmation_token: null,
    }, {
      where: { id: penggunaData.id },
      transaction,
    });

    await Umum.create({
      id_pengguna: penggunaData.id,
      nama: penggunaData.nama,
      profil_responden: penggunaData.profil_responden,
      profil_klien: penggunaData.profil_klien,
    }, { transaction });

    await transaction.commit();
    return await Pengguna.findByPk(penggunaData.id, {attributes: ['id', 'email'], include: [Umum]});    
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
