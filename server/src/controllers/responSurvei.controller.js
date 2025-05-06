import * as responseService from '../services/responSurvei.service.js';
import { resSuccess, resFail } from '../utils/responseHandler.js';

export const getResponSurveis = async (req, res) => {
  try {
    const result = await responseService.index(req.params.surveiId, req.query);
    const message = result.length > 0
      ? 'Respon survei list retrieved successfully'
      : 'No respon survei found';
    resSuccess(res, message, result);
  } catch (error) {
    resFail(res, error.message, error.status);
  }
};

export const getResponSurvei = async (req, res) => {
  try {
    const responSurvei = await responseService.show(req.params.id);
    resSuccess(res, 'Respon survei details retrieved successfully', responSurvei);
  } catch (error) {
    resFail(res, error.message, error.status);
  }
};

export const deleteResponSurvei = async (req, res) => {
  try {
    await responseService.destroy(req.params.id);
    resSuccess(res, 'Respon survei deleted successfully', null);
  } catch (error) {
    resFail(res, error.message, error.status);
  }
};
