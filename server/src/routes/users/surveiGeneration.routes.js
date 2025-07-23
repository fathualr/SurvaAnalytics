import express from 'express';
import * as userSurveiGenerationController from '../../controllers/users/surveiGeneration.controller.js';
import { authenticate, authorize } from '../../middlewares/auth.js';
import { validate } from '../../middlewares/validate.js';
import { generatedUserSurveiSchema } from '../../validations/users/surveiGeneration.validation.js';

const router = express.Router();

router.post('/save', authenticate, authorize('umum'), validate(generatedUserSurveiSchema), userSurveiGenerationController.saveUserGeneratedSurvei);

export default router;
