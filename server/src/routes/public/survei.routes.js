import express from 'express';
import * as publicSurveiController from '../../controllers/public/survei.controller.js';

const router = express.Router();

router.get('/', publicSurveiController.getPublishedSurveis);

export default router;
