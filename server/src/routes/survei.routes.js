import express from 'express';
import * as surveiController from '../controllers/survei.controller.js';
import { validate } from '../middlewares/validate.js';
import { createSurveiSchema, updateSurveiSchema } from '../validations/survei.validation.js';

const router = express.Router();

router.get('/', surveiController.getSurveis);
router.get('/:id', surveiController.getSurvei);
router.post('/', validate(createSurveiSchema), surveiController.createSurvei);
router.patch('/:id', validate(updateSurveiSchema), surveiController.updateSurvei);
router.delete('/:id', surveiController.deleteSurvei);

export default router;
