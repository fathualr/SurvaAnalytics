import express from 'express';
import * as userSurveiController from '../../controllers/users/survei.controller.js';
import { authenticate, authorize } from '../../middlewares/auth.js';

const router = express.Router();

router.get('/', authenticate, authorize('umum'), userSurveiController.getUserSurveis);
router.post('/', authenticate, authorize('umum'), userSurveiController.createUserSurvei);
router.get('/:id', authenticate, authorize('umum'), userSurveiController.getUserSurvei);
router.patch('/:id', authenticate, authorize('umum'), userSurveiController.updateUserSurvei);
router.delete('/:id', authenticate, authorize('umum'), userSurveiController.deleteUserSurvei);

export default router;
