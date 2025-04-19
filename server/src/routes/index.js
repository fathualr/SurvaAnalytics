import { Router } from 'express';
import penggunaRoutes from './pengguna.routes.js';
import surveiRoutes from './survei.routes.js';

const router = Router();

router.use('/pengguna', penggunaRoutes);
router.use('/survei', surveiRoutes);

export default router;
