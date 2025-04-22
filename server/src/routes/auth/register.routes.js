import express from 'express';
import * as registerController from '../../controllers/auth/register.controller.js';

const router = express.Router();

router.post('/', registerController.emailRegister);
router.post('/verify', registerController.verifyOTP);
router.post('/account', registerController.completeAccount);

export default router;
