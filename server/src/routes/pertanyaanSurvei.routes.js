import express from 'express';
import * as pertanyaanSurveiController from '../controllers/pertanyaanSurvei.controller.js';
import { validate } from '../middlewares/validate.js';
import { createPertanyaanSurveiSchema, updatePertanyaanSurveiSchema } from '../validations/pertanyaanSurvei.validation.js';

const router = express.Router({ mergeParams: true });

router.get('/', pertanyaanSurveiController.getpertanyaanSurveis);
router.get('/:id', pertanyaanSurveiController.getPertanyaanSurvei);
router.post('/', validate(createPertanyaanSurveiSchema), pertanyaanSurveiController.createPertanyaanSurvei);
router.patch('/:id', validate(updatePertanyaanSurveiSchema), pertanyaanSurveiController.updatePertanyaanSurvei);
router.delete('/:id', pertanyaanSurveiController.deletePertanyaanSurvei);

export default router;
