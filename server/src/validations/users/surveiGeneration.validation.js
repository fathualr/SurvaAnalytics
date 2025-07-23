import Joi from 'joi';

const validVisualisasi = ['pie', 'bar', 'doughnut', 'radar', 'text', 'wordcloud', 'sentiment_analysis'];
const validTipe = ['pilihan_ganda', 'essay', 'checkbox', 'dropdown', 'skala'];

function getDateOnlyUTC(date) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}
const defaultTanggalMulai = getDateOnlyUTC(new Date(Date.now() + 3 * 86400000));
const defaultTanggalBerakhir = getDateOnlyUTC(new Date(Date.now() + 9 * 86400000));

export const generatedUserSurveiSchema = Joi.object({
  judul: Joi.string().max(255).required(),
  deskripsi: Joi.string().allow('').optional(),
  jumlah_responden: Joi.number().integer().min(1).max(1000).required(),
  tanggal_mulai: Joi.date().iso().default(defaultTanggalMulai),
  tanggal_berakhir: Joi.date().iso().default(defaultTanggalBerakhir),
  kriteria: Joi.object().optional(),
  PertanyaanSurvei: Joi.array().items(
    Joi.object({
      teks_pertanyaan: Joi.string().min(3).max(500).required(),
      tipe_pertanyaan: Joi.string().valid(...validTipe).default('pilihan_ganda'),
      opsi: Joi.when('tipe_pertanyaan', {
        is: Joi.not('essay'),
        then: Joi.array().min(1).required(),
        otherwise: Joi.optional()
      }),
      is_required: Joi.boolean().default(true),
      tipe_visualisasi: Joi.alternatives().conditional('tipe_pertanyaan', {
        is: 'essay',
        then: Joi.string().valid(...validVisualisasi).default('text'),
        otherwise: Joi.string().valid(...validVisualisasi).default('pie')
      })
    })
  )
});
