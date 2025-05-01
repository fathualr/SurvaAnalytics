import express from 'express';
import * as responSurveiSubmissionController from '../controllers/responSurveiSubmission.controller.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router({ mergeParams: true });

router.get('/draft', authenticate, responSurveiSubmissionController.getDraft);
router.patch('/draft', authenticate, responSurveiSubmissionController.updateDraft);
router.post('/submit', authenticate, responSurveiSubmissionController.submitRespons);

export default router;
