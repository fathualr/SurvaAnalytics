import express from 'express';
import * as profileController from '../../controllers/users/profile.controller.js';
import { authenticate, authorize } from '../../middlewares/auth.js';

const router = express.Router();

router.get('/', authenticate, authorize('umum'), profileController.getProfile);
router.patch('/', authenticate, authorize('umum'), profileController.updateProfile);

export default router;
