import express from 'express';
import * as responSurveiController from '../controllers/responSurvei.controller.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router({ mergeParams: true });

router.get('/draft', authenticate, responSurveiController.getDraft);
router.patch('/draft', authenticate, responSurveiController.updateDraft);
router.post('/submit', authenticate, responSurveiController.submitRespons);

export default router;
