import express from 'express';
import * as penukaranHadiahRoutes from '../controllers/penukaranHadiah.controller.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', penukaranHadiahRoutes.getPenukaranHadiahs);
router.get('/:id', penukaranHadiahRoutes.getPenukaranHadiah);
router.post('/', authenticate, penukaranHadiahRoutes.createPenukaranHadiah);

export default router;
