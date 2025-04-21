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
