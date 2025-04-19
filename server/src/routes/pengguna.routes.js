import express from 'express';
import * as penggunaController from '../controllers/pengguna.controller.js';
import { validate } from '../middlewares/validate.js';
import { createPenggunaSchema, updatePenggunaSchema } from '../validations/pengguna.validation.js';

const router = express.Router();

router.get('/', penggunaController.getPenggunas);
router.get('/:id', penggunaController.getPengguna);
router.post('/', validate(createPenggunaSchema), penggunaController.createPengguna);
router.patch('/:id', validate(updatePenggunaSchema), penggunaController.updatePengguna);
router.delete('/:id', penggunaController.deletePengguna);

export default router;
