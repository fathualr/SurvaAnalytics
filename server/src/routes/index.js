import { Router } from 'express';
import penggunaRoutes from './pengguna.routes.js';

const router = Router();

router.use('/pengguna', penggunaRoutes);

export default router;
