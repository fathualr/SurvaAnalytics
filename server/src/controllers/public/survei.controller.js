import * as surveiService from '../../services/survei.service.js';
import { resSuccess, resFail } from '../../utils/responseHandler.js';

export const getPublishedSurveis = async (req, res) => {
  try {
    const result = await surveiService.index({
      ...req.query,
      status: 'published'
    });
    const message = result.data.length > 0
      ? 'Published survei retrieved successfully'
      : 'No published survei found';
    resSuccess(res, message, result);
  } catch (error) {
    resFail(res, error.message, error.status);
  }
};
