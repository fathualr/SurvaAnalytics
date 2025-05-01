import * as responseService from '../services/responSurvei.service.js';

export const getResponSurveis = async (req, res) => {
  try {
    const result = await responseService.index(
      req.params.surveiId, 
      req.query
    );
    
    res.json({
      status: 'success',
      result
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

export const getResponSurvei = async (req, res) => {
  try {
    const responSurvei = await responseService.show(req.params.id);
    res.json({
      status: 'success',
      message: 'Respon survei details retrieved successfully',
      data: responSurvei
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message
    });
  }
};

export const deleteResponSurvei = async (req, res) => {
  try {
    await responseService.destroy(req.params.id);
    res.json({
      status: 'success',
      message: 'Respon survei deleted successfully',
      data: null
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};
