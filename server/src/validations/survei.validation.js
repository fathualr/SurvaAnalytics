import Joi from 'joi';

const minStartDate = new Date();
minStartDate.setDate(minStartDate.getDate() + 3);

export const createSurveiSchema = Joi.object({
  id_umum: Joi.string().uuid().required(),
  judul: Joi.string().max(255).required(),
  deskripsi: Joi.string().allow('').optional(),
  jumlah_responden: Joi.number().integer().min(1).required(),
  tanggal_mulai: Joi.date().iso().min(minStartDate),
  tanggal_berakhir: Joi.date().iso().required().greater(Joi.ref('tanggal_mulai')),
  hadiah_poin: Joi.number().integer().min(0).default(0),
  kriteria: Joi.object().optional(),
  
  status: Joi.forbidden()
});

export const updateSurveiSchema = Joi.object({
  judul: Joi.string().max(255).optional(),
  deskripsi: Joi.string().allow('').optional(),
  jumlah_responden: Joi.number().integer().min(1).optional(),
  tanggal_mulai: Joi.date().iso().min(minStartDate),
  tanggal_berakhir: Joi.date().iso().greater(Joi.ref('tanggal_mulai')).optional(),
  kriteria: Joi.object().optional(),
});
