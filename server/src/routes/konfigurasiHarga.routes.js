import express from 'express';
import * as konfigurasiHargaController from '../controllers/konfigurasiHarga.controller.js';

const router = express.Router();

router.get('/', konfigurasiHargaController.getConfig);
router.post('/', konfigurasiHargaController.createConfig);
router.patch('/', konfigurasiHargaController.updateConfig);

export default router;
