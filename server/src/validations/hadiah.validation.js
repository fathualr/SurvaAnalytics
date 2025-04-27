import Joi from 'joi';

export const createHadiahSchema = Joi.object({
  deskripsi: Joi.string().optional(),
  stok: Joi.number().integer().min(0).required(),
  harga_poin: Joi.number().integer().min(0).required()
}); 

export const updateHadiahSchema = Joi.object({
  deskripsi: Joi.string().optional(),
  stok: Joi.number().integer().min(0).optional(),
  harga_poin: Joi.number().integer().min(0).optional()
});