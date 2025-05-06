import Joi from 'joi';

export const createPertanyaanSurveiSchema = Joi.object({
  teks_pertanyaan: Joi.string().min(3).max(500).required(),
  tipe_pertanyaan: Joi.string().valid('pilihan_ganda', 'essay', 'checkbox', 'dropdown', 'skala').required(),
  opsi: Joi.when('tipe_pertanyaan', {
    is: Joi.not('text'),
    then: Joi.array().min(1).required(),
    otherwise: Joi.optional()
  }),
  is_required: Joi.boolean().default(true)
});

export const updatePertanyaanSurveiSchema = Joi.object({
  teks_pertanyaan: Joi.string().min(3).max(500).optional(),
  tipe_pertanyaan: Joi.string().valid('pilihan_ganda', 'essay', 'checkbox', 'dropdown', 'skala').optional(),
  opsi: Joi.when('tipe_pertanyaan', {
    is: Joi.not('text'),
    then: Joi.array().min(1).required(),
    otherwise: Joi.optional()
  }),
  is_required: Joi.boolean().optional()
});

export const updateTipeVisualisasiSchema = Joi.object({
  tipe_visualisasi: Joi.string().valid('pie', 'bar', 'line', 'doughnut', 'radar', 'text').optional()
})
