import * as konfigurasiHargaService from '../services/konfigurasiHarga.service.js';

export const getConfig = async (req, res) => {
  try {
    const config = await konfigurasiHargaService.index();
    res.json({
      status: 'success',
      message: `Konfigurasi harga retrieved successfully`,
      data: config
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message
    });
  }
};

export const createConfig = async (req, res) => {
  try {
    const newConfig = await konfigurasiHargaService.create(req.body);
    res.status(201).json({
      status: 'success',
      message: 'Konfigurasi created successfully',
      data: newConfig
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

export const updateConfig = async (req, res) => {
  try {
    const updatedConfig = await konfigurasiHargaService.update(req.body);
    res.json({
      status: 'success',
      message: 'Konfigurasi harga updated successfully',
      data: updatedConfig
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};
