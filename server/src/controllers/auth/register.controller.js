import * as registerService from '../../services/auth/register.service.js';

export const emailRegister = async (req, res) => {
  try {
    const result = await registerService.startRegistration(req.body.email);
    res.json(result);
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
