import * as pertanyaanSurveiService from '../services/pertanyaanSurvei.service.js';

export const getpertanyaanSurveis = async (req, res) => {
  try {
    const pertanyaanSurveis = await pertanyaanSurveiService.index(req.params.surveiId);
    res.json({
      status: 'success',
      message: pertanyaanSurveis.length > 0 
        ? 'Pertanyaan survei retrieved successfully' 
        : 'No pertanyaan survei found for this survei',
      results: pertanyaanSurveis.length,
      data: pertanyaanSurveis
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: 'Failed to fetch pertanyaan survei'
    });
  }
};

export const createPertanyaanSurvei = async (req, res) => {
  try {
    const newPertanyaanSurvei = await pertanyaanSurveiService.create({
      ...req.body,
      id_survei: req.params.surveiId
    });
    res.status(201).json({
      status: 'success',
      message: 'Pertanyaan survei created successfully',
      data: newPertanyaanSurvei
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

export const getPertanyaanSurvei = async (req, res) => {
  try {
    const pertanyaanSurvei = await pertanyaanSurveiService.show(req.params.id);
    res.json({
      status: 'success',
      message: 'Pertanyaan survei details retrieved successfully',
      data: pertanyaanSurvei
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message
    });
  }
};

export const updatePertanyaanSurvei = async (req, res) => {
  try {
    const updatedPertanyaanSurvei = await pertanyaanSurveiService.update(req.params.id, req.body);
    res.json({
      status: 'success',
      message: 'Pertanyaan survei updated successfully',
      data: updatedPertanyaanSurvei
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

export const deletePertanyaanSurvei = async (req, res) => {
  try {
    await pertanyaanSurveiService.destroy(req.params.id);
    res.json({
      status: 'success',
      message: 'Pertanyaan survei deleted successfully',
      data: null
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};
