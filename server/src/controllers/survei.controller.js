import * as surveiService from '../services/survei.service.js';

export const getSurveis = async (req, res) => {
  try {
    const surveis = await surveiService.index(req.query);
    res.json({
      status: 'success',
      message: surveis.length > 0 
        ? 'Surveis retrieved successfully' 
        : 'No surveis found',
      results: surveis.length,
      data: surveis
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch surveis'
    });
  }
};

export const createSurvei = async (req, res) => {
  try {
    const newSurvei = await surveiService.create(req.body);
    res.status(201).json({
      status: 'success',
      message: 'Survei created successfully',
      data: newSurvei
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

export const getSurvei = async (req, res) => {
  try {
    const survei = await surveiService.show(req.params.id);
    res.json({
      status: 'success',
      message: `Survei details for ID ${req.params.id} retrieved successfully`,
      data: survei
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message
    });
  }
};

export const updateSurvei = async (req, res) => {
  try {
    const updatedSurvei = await surveiService.update(req.params.id, req.body);
    res.json({
      status: 'success',
      message: `Survei with ID ${req.params.id} updated successfully`,
      data: updatedSurvei
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

export const deleteSurvei = async (req, res) => {
  try {
    await surveiService.destroy(req.params.id);
    res.json({
      status: 'success',
      message: `Survei with ID ${req.params.id} deleted successfully`,
      data: null
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};
