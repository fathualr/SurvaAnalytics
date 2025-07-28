import * as surveiService from '../../services/survei.service.js';
import * as PertanyaanSurveiService from '../../services/pertanyaanSurvei.service.js';
import { resSuccess, resFail } from '../../utils/responseHandler.js';
import { getUmumIdByUserId } from '../../utils/userMapper.js';

export const saveUserGeneratedSurvei = async (req, res) => {
  try {
    const umumId = await getUmumIdByUserId(req.user.userId);
    const { PertanyaanSurvei: pertanyaanList = [], ...survei} = req.body;
    const surveiData = {
      ...survei,
      id_umum: umumId
    };
    const newSurvei = await surveiService.create(surveiData);

    for (const p of pertanyaanList) {
      await PertanyaanSurveiService.create({
        ...p,
        id_survei: newSurvei.id
      });
    }
    resSuccess(res, 'Generated survei created successfully', newSurvei);
  } catch (error) {
    resFail(res, error.message, error.status);
  }
};
