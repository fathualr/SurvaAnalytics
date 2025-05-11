import express from 'express';
import * as responSurveiResultController from '../../controllers/users/responSurveiResult.controller.js';
import { authenticate, authorize } from '../../middlewares/auth.js';

const router = express.Router();

router.get('/:surveiId/respon-survei', authenticate, authorize('umum'), responSurveiResultController.getAllResponFromMySurvei);
router.get('/:surveiId/respon-survei/:id', authenticate, authorize('umum'), responSurveiResultController.getResponFromMySurvei);
router.get('/:surveiId/summary', authenticate, authorize('umum'), responSurveiResultController.getUserResponSurveiResultSummary);

export default router;
