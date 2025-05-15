import * as penukaranHadiahService from '../services/penukaranHadiah.service.js';
import { resSuccess, resFail } from '../utils/responseHandler.js';

export const getPenukaranHadiahs = async (req, res) => {
  try {
    const result = await penukaranHadiahService.index(req.query);
    resSuccess(res, 'Penukaran hadiah retrieved successfully', result);
  } catch (error) {
    resFail(res, error.message, error.status);
  }
};

export const createPenukaranHadiah = async (req, res) => {
  try {
    const penukaranHadiah = await penukaranHadiahService.create(
      req.user.userId,
      req.body
    );
    resSuccess(res, 'Penukaran hadiah created successfully', penukaranHadiah, 201);
  } catch (error) {
    resFail(res, error.message, error.status);
  }
};

export const getPenukaranHadiah = async (req, res) => {
  try {
    const penukaranHadiah = await penukaranHadiahService.show(req.params.id);
    resSuccess(res, 'Penukaran hadiah details retrieved successfully', penukaranHadiah);
  } catch (error) {
    resFail(res, error.message, error.status);
  }
};
