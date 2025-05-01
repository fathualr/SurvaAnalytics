import express from 'express';
import * as responSurveiSubmissionController from '../controllers/responSurveiSubmission.controller.js';
import { authenticate } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { saveDraftSchema } from '../validations/responSurveiSubmission.validation.js';

const router = express.Router({ mergeParams: true });

router.get('/draft', authenticate, responSurveiSubmissionController.getDraft);
router.patch('/draft', authenticate, validate(saveDraftSchema), responSurveiSubmissionController.updateDraft);
router.post('/submit', authenticate, responSurveiSubmissionController.submitRespons);

export default router;
