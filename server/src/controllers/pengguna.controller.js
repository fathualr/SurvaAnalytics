import * as userService from '../services/pengguna.service.js';

export const getUsers = async (req, res) => {
  try {
    const users = await userService.index();
    res.json({
      status: 'success',
      message: users.length > 0 
        ? 'Users retrieved successfully' 
        : 'No users found',
      results: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch users'
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const newUser = await userService.create(req.body);
    res.status(201).json({
      status: 'success',
      message: `User created successfully`,
      data: newUser
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await userService.show(req.params.id);
    res.json({
      status: 'success',
      message: `User details for ID ${req.params.id} retrieved successfully`,
      data: user
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await userService.update(req.params.id, req.body);
    res.json({
      status: 'success',
      message: `User with ID ${req.params.id} updated successfully`,
      data: updatedUser
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await userService.destroy(req.params.id);
    res.json({
      status: 'success',
      message: `User with ID ${req.params.id} deleted successfully`,
      data: null
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};
