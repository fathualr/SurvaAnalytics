import * as penggunaService from '../../services/pengguna.service.js';

export const getProfile = async (req, res) => {
  try {
    const profile = await penggunaService.show(req.user.userId);
    res.json({
      status: 'success',
      message: `Profile retrieved successfully`,
      data: profile
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const updateProfile = await penggunaService.update(req.user.userId, req.body);
    res.json({
      status: 'success',
      message: `Profile updated successfully`,
      data: updateProfile
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};
