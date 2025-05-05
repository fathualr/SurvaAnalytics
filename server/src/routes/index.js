import { Router } from 'express';
import loginRoutes from './auth/login.routes.js';
import registerRoutes from './auth/register.routes.js';
import penggunaRoutes from './pengguna.routes.js';
import surveiRoutes from './survei.routes.js';
import pertanyaanSurveiRoutes from './pertanyaanSurvei.routes.js';
import responSurveiRoutes from './responSurvei.routes.js';
import responSurveiSubmissionRoutes from './responSurveiSubmission.routes.js';
import konfigurasiHargaRoutes from './konfigurasiHarga.routes.js';
import hadiahRoutes from './hadiah.routes.js';
import penukaranHadiahRoutes from './penukaranHadiah.routes.js';

import profileRoutes from './users/profile.routes.js';
import userSurveiRoutes from './users/survei.routes.js';

const router = Router();

router.use('/', loginRoutes);
router.use('/register', registerRoutes);
router.use('/pengguna', penggunaRoutes);
router.use('/survei', surveiRoutes);
router.use('/survei/:surveiId/pertanyaan-survei', pertanyaanSurveiRoutes);
router.use('/survei/:surveiId/respon-survei', [responSurveiSubmissionRoutes, responSurveiRoutes]);
router.use('/konfigurasi-harga', konfigurasiHargaRoutes);
router.use('/hadiah', hadiahRoutes);
router.use('/penukaran-hadiah', penukaranHadiahRoutes);

router.use('/users/profile', profileRoutes)
router.use('/users/survei', userSurveiRoutes)

export default router;
