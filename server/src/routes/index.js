import { Router } from 'express';
import loginRoutes from './auth/login.routes.js';
import registerRoutes from './auth/register.routes.js';
import penggunaRoutes from './pengguna.routes.js';
import surveiRoutes from './survei.routes.js';

const router = Router();

router.use('/', loginRoutes);
router.use('/auth/register', registerRoutes);
router.use('/pengguna', penggunaRoutes);
router.use('/survei', surveiRoutes);

export default router;
