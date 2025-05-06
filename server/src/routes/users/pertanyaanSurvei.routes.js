import express from 'express';
import * as userPertanyaanSurveiController from '../../controllers/users/pertanyaanSurvei.controller.js';
import { authenticate, authorize } from '../../middlewares/auth.js';

const router = express.Router({ mergeParams: true });

router.get('/survei/:surveiId/pertanyaan-survei', authenticate, authorize('umum'), userPertanyaanSurveiController.getUserPertanyaanSurveis);
router.post('/survei/:surveiId/pertanyaan-survei', authenticate, authorize('umum'), userPertanyaanSurveiController.createUserPertanyaanSurvei);
router.get('/pertanyaan-survei/:id', authenticate, authorize('umum'), userPertanyaanSurveiController.getUserPertanyaanSurvei);
router.patch('/pertanyaan-survei/:id', authenticate, authorize('umum'), userPertanyaanSurveiController.updateUserPertanyaanSurvei);
router.delete('/pertanyaan-survei/:id', authenticate, authorize('umum'), userPertanyaanSurveiController.deleteUserPertanyaanSurvei);

export default router;
