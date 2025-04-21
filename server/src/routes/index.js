import { Router } from 'express';
import registerRoutes from './auth/register.routes.js';
import penggunaRoutes from './pengguna.routes.js';
import surveiRoutes from './survei.routes.js';

const router = Router();

router.use('/auth/register', registerRoutes);
router.use('/pengguna', penggunaRoutes);
router.use('/survei', surveiRoutes);

export default router;
