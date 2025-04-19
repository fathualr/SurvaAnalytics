import * as penggunaService from '../services/pengguna.service.js';

export const getPenggunas = async (req, res) => {
  try {
    const penggunas = await penggunaService.index();
    res.json({
      status: 'success',
      message: penggunas.length > 0 
        ? 'Penggunas retrieved successfully' 
        : 'No penggunas found',
      results: penggunas.length,
      data: penggunas
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch penggunas'
    });
  }
};

export const createPengguna = async (req, res) => {
  try {
    const newPengguna = await penggunaService.create(req.body);
    res.status(201).json({
      status: 'success',
      message: `Pengguna created successfully`,
      data: newPengguna
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

export const getPengguna = async (req, res) => {
  try {
    const pengguna = await penggunaService.show(req.params.id);
    res.json({
      status: 'success',
      message: `Pengguna details for ID ${req.params.id} retrieved successfully`,
      data: pengguna
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message
    });
  }
};

export const updatePengguna = async (req, res) => {
  try {
    const updatePengguna = await penggunaService.update(req.params.id, req.body);
    res.json({
      status: 'success',
      message: `Pengguna with ID ${req.params.id} updated successfully`,
      data: updatePengguna
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

export const deletePengguna = async (req, res) => {
  try {
    await penggunaService.destroy(req.params.id);
    res.json({
      status: 'success',
      message: `Pengguna with ID ${req.params.id} deleted successfully`,
      data: null
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};
