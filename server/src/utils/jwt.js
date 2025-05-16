import jwt from 'jsonwebtoken';
import config from '../config/jwt.js';

export const generateAccessToken = (userId, role) => {
  return jwt.sign(
    { userId, role, type: 'access' },
    config.accessSecret,
    { expiresIn: config.accessExpires, algorithm: config.algorithm }
  );
};

export const generateRefreshToken = (userId, role) => {
  return jwt.sign(
    { userId, role, type: 'refresh' },
    config.refreshSecret,
    { expiresIn: config.refreshExpires, algorithm: config.algorithm }
  );
};

export const generateCustomToken = (payload, expiresIn) => {
  return jwt.sign(
    payload,
    config.accessSecret,
    { expiresIn, algorithm: config.algorithm }
  );
};

export const verifyAccessToken = (token) => {
  return jwt.verify(token, config.accessSecret);
};

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, config.refreshSecret);
};
