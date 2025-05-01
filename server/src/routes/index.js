import { Router } from 'express';
import loginRoutes from './auth/login.routes.js';
import registerRoutes from './auth/register.routes.js';
import penggunaRoutes from './pengguna.routes.js';
import surveiRoutes from './survei.routes.js';
import pertanyaanSurveiRoutes from './pertanyaanSurvei.routes.js';
import responSurveiRoutes from './responSurvei.routes.js';
import responSurveiSubmissionRoutes from './responSurveiSubmission.routes.js';
import hadiahRoutes from './hadiah.routes.js';

const router = Router();

router.use('/', loginRoutes);
router.use('/register', registerRoutes);
router.use('/pengguna', penggunaRoutes);
router.use('/survei', surveiRoutes);
router.use('/survei/:surveiId/pertanyaan-survei', pertanyaanSurveiRoutes);
router.use('/survei/:surveiId/respon-survei', [responSurveiSubmissionRoutes, responSurveiRoutes]);
router.use('/hadiah', hadiahRoutes);

export default router;
