import express from 'express';
import * as responSurveiController from '../controllers/responSurvei.controller.js';

const router = express.Router({ mergeParams: true });

router.get('/', responSurveiController.getResponSurveis);
router.get('/:id', responSurveiController.getResponSurvei);
router.delete('/:id', responSurveiController.deleteResponSurvei);

export default router;
