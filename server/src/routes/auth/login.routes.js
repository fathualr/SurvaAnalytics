import express from 'express';
import * as loginController from '../../controllers/auth/login.controller.js';

const router = express.Router();

router.post('/login', loginController.login);
router.post('/refresh', loginController.refresh);
router.post('/logout', loginController.logout);

export default router;
