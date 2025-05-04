import express from 'express';
import * as penukaranHadiahRoutes from '../controllers/penukaranHadiah.controller.js';
import { authenticate } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { createPenukaranHadiahSchema } from '../validations/penukaranHadiah.validation.js';

const router = express.Router();

router.get('/', penukaranHadiahRoutes.getPenukaranHadiahs);
router.get('/:id', penukaranHadiahRoutes.getPenukaranHadiah);
router.post('/', authenticate, validate(createPenukaranHadiahSchema), penukaranHadiahRoutes.createPenukaranHadiah);

export default router;
