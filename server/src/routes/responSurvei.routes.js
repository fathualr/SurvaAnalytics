import express from 'express';
import * as responSurveiController from '../controllers/responSurvei.controller.js';

const router = express.Router({ mergeParams: true });

router.get('/survei/:surveiId/respon-survei', responSurveiController.getResponSurveis);
router.get('/respon-survei/:id', responSurveiController.getResponSurvei);
router.delete('/respon-survei/:id', responSurveiController.deleteResponSurvei);

export default router;
