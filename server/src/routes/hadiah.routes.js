import express from 'express';
import * as hadiahController from '../controllers/hadiah.controller.js';
import { validate } from '../middlewares/validate.js';
import { createHadiahSchema, updateHadiahSchema } from '../validations/hadiah.validation.js';

const router = express.Router();

router.get('/', hadiahController.getHadiahs);
router.get('/:id', hadiahController.getHadiah);
router.post('/', validate(createHadiahSchema), hadiahController.createHadiah);
router.patch('/:id', validate(updateHadiahSchema), hadiahController.updateHadiah);
router.delete('/:id', hadiahController.deleteHadiah);

export default router;