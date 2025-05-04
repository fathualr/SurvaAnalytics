import * as penukaranHadiahService from '../services/penukaranHadiah.service.js';

export const getPenukaranHadiahs = async (req, res) => {
  try {
    const result = await penukaranHadiahService.index(req.query);
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

export const createPenukaranHadiah = async (req, res) => {
  try {
    const penukaranHadiah = await penukaranHadiahService.create(
      req.user.userId,
      req.body
    );
    res.status(201).json({
      status: 'success',
      message: 'Penukaran hadiah created successfully',
      data: penukaranHadiah
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

export const getPenukaranHadiah = async (req, res) => {
  try {
    const penukaranHadiah = await penukaranHadiahService.show(req.params.id);
    res.json({
      status: 'success',
      message: 'Penukaran hadiah details retrieved successfully',
      data: penukaranHadiah
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message
    });
  }
};
