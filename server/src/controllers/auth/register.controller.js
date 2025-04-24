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
      data: result
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
    const result = await registerService.completeRegistration(req.body);
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
