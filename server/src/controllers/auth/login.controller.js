import * as loginService from '../../services/auth/login.service.js';
import { resSuccess, resFail } from '../../utils/responseHandler.js';

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { accessToken, refreshToken } = await loginService.userLogin(email, password);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    resSuccess(res, 'Logged in successfully', { accessToken });
  } catch (error) {
    resFail(res, error.message, error.status);
  }
};

export const refresh = (req, res) => {
  try {
    const accessToken = loginService.userRefresh(req.cookies?.refreshToken);
    resSuccess(res, 'Refresh token successfully', { accessToken });
  } catch (error) {
    resFail(res, error.message, error.status);
  }
};

export const logout = (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    
    if (!refreshToken) throw { status: 401, message: 'No active session' };

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict'
    });
    resSuccess(res, 'Logged out successfully');
  } catch (error) {
    resFail(res, error.message, error.status);
  }
};
