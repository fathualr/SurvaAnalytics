import express from 'express';
import * as userController from '../controllers/pengguna.controller.js';
import { validate } from '../middlewares/validate.js';
import { createPenggunaSchema, updatePenggunaSchema } from '../validations/pengguna.validation.js';

const router = express.Router();

router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.post('/', validate(createPenggunaSchema), userController.createUser);
router.patch('/:id', validate(updatePenggunaSchema), userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;
