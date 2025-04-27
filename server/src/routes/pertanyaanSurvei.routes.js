import express from 'express';
import * as pertanyaanSurveiController from '../controllers/pertanyaanSurvei.controller.js';

const router = express.Router({ mergeParams: true });

router.get('/', pertanyaanSurveiController.getpertanyaanSurveis);
router.get('/:id', pertanyaanSurveiController.getPertanyaanSurvei);
router.post('/', pertanyaanSurveiController.createPertanyaanSurvei);
router.patch('/:id', pertanyaanSurveiController.updatePertanyaanSurvei);
router.delete('/:id', pertanyaanSurveiController.deletePertanyaanSurvei);

export default router;
