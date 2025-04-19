import express from 'express';
import * as surveiController from '../controllers/survei.controller.js';

const router = express.Router();

router.get('/', surveiController.getSurveis);
router.get('/:id', surveiController.getSurvei);
router.post('/', surveiController.createSurvei);
router.patch('/:id', surveiController.updateSurvei);
router.delete('/:id', surveiController.deleteSurvei);

export default router;
