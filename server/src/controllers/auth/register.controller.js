import { verifyAccessToken } from '../../utils/jwt.js';
import * as registerService from '../../services/auth/register.service.js';

export const emailRegister = async (req, res) => {
  try {
    const result = await registerService.emailVerification(req.body.email);
    res.json({
      status: "success",
      message: "OTP has been sent to your email",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const result = await registerService.validationOTP(req.body.email, req.body.otp);
    res.json({
      status: "success",
      message: "OTP verified successfully",
      data: { register_token : result }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

export const completeAccount = async (req, res) => {
  try {
    const { register_token: registerToken, ...accountData } = req.body;
    if (!registerToken) throw new Error("Unauthorized request");

    const payload = verifyAccessToken(registerToken);
    if (payload.type !== 'register') throw new Error("Invalid register token");

    const result = await registerService.completeRegistration({
      ...accountData,
      id: payload.userId
    });

    res.json({
      status: "success",
      message: "Account registered successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};
