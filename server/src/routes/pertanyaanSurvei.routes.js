import express from 'express';
import * as pertanyaanSurveiController from '../controllers/pertanyaanSurvei.controller.js';
import { validate } from '../middlewares/validate.js';
import { createPertanyaanSurveiSchema, updatePertanyaanSurveiSchema } from '../validations/pertanyaanSurvei.validation.js';

const router = express.Router({ mergeParams: true });

router.get('/survei/:surveiId/pertanyaan-survei', pertanyaanSurveiController.getpertanyaanSurveis);
router.post('/survei/:surveiId/pertanyaan-survei', validate(createPertanyaanSurveiSchema), pertanyaanSurveiController.createPertanyaanSurvei);
router.get('/pertanyaan-survei/:id', pertanyaanSurveiController.getPertanyaanSurvei);
router.patch('/pertanyaan-survei/:id', validate(updatePertanyaanSurveiSchema), pertanyaanSurveiController.updatePertanyaanSurvei);
router.delete('/pertanyaan-survei/:id', pertanyaanSurveiController.deletePertanyaanSurvei);

export default router;
