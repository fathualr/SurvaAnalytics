import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../../utils/jwt.js';
import db from '../../models/index.js';
const { Pengguna } = db;
import bcrypt from 'bcrypt';

export const loginService = async (email, password) => {
  const user = await Pengguna.findOne({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Email or password is incorrect');
  }

  const accessToken = generateAccessToken(user.id, user.role);
  const refreshToken = generateRefreshToken(user.id);

  return { accessToken, refreshToken };
};

export const refreshService = (refreshTokenCookie) => {
  if (!refreshTokenCookie) {
    throw new Error('Missing refresh token');
  }

  const payload = verifyRefreshToken(refreshTokenCookie);
  const accessToken = generateAccessToken(payload.userId, payload.role || 'umum');

  return accessToken;
};
