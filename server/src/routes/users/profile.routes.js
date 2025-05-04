import express from 'express';
import * as profileController from '../../controllers/users/profile.controller.js';
import { authenticate, authorize } from '../../middlewares/auth.js';
import { validate } from '../../middlewares/validate.js';
import { updateProfileSchema } from '../../validations/users/profile.validation.js';

const router = express.Router();

router.get('/', authenticate, authorize('umum'), profileController.getProfile);
router.patch('/', authenticate, authorize('umum'), validate(updateProfileSchema), profileController.updateProfile);

export default router;
