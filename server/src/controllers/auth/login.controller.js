import * as authService from '../../services/auth/login.service.js';

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { accessToken, refreshToken } = await authService.loginService(email, password);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({
      status: 'success',
      message: `Logged in successfully`,
      data: { accessToken }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

export const refresh = (req, res) => {
  try {
    const accessToken = authService.refreshService(req.cookies?.refreshToken);
    res.json({
      status: 'success',
      message: `Refresh token successfully`,
      data: { accessToken}
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

export const logout = (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    
    if (!refreshToken) throw new Error('No active session');

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict'
    });
    res.json({
      status: 'success',
      message: `Logged out succesfully`
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};
