import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../../utils/jwt.js';
import db from '../../models/index.js';
const { Pengguna } = db;
import bcrypt from 'bcrypt';

export const userLogin = async (email, password) => {
  const user = await Pengguna.findOne({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw { status: 401, message: 'Email or password is incorrect' };
  }

  const accessToken = generateAccessToken(user.id, user.role);
  const refreshToken = generateRefreshToken(user.id);

  return { accessToken, refreshToken };
};

export const userRefresh = (refreshTokenCookie) => {
  if (!refreshTokenCookie) {
    throw { status: 401, message: 'Missing refresh token' };
  }

  let payload;
  try {
    payload = verifyRefreshToken(refreshTokenCookie);
  } catch (err) {
    throw { status: 403, message: 'Invalid refresh token' };
  }

  const accessToken = generateAccessToken(payload.userId, payload.role || 'umum');

  return accessToken;
};
