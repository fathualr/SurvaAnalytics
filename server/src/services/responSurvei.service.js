import db from '../models/index.js';
const { ResponSurvei, Survei, PertanyaanSurvei, Umum, Pengguna, sequelize } = db;
import { parseQuery, metaQueryFormat } from '../utils/queryParser.js';

export const index = async (surveiId, queryParams) => {
  const { where, order, pagination } = parseQuery(queryParams, {
    allowedFilters: ['is_completed']
  });

  const survei = await Survei.findByPk(surveiId);
  if (!survei) throw new Error('Survei not found');

  const { count, rows } = await ResponSurvei.findAndCountAll({
    where: {
      ...where,
      id_survei: surveiId,
    },
    include: [
      {
        model: Umum,
        attributes: ['id', 'nama'],
        include: [
          {
            model: Pengguna,
            attributes: ['id', 'email']
          }
        ]
      }
    ],
    order,
    ...pagination,
    distinct: true
  });

  return {
    data: rows,
    ...metaQueryFormat({ count }, pagination)
  };
};

export const show = async (responSurveiId) => {
  const responSurvei = await ResponSurvei.findByPk(responSurveiId, {
    include: [
      {
        model: Umum,
        attributes: ['id', 'nama'],
        include: [
          {
            model: Pengguna,
            attributes: ['id', 'email']
          }
        ]
      },
      { 
        model: Survei,
        attributes: ['id', 'judul', 'status', 'deskripsi'],
        include: [
          {
            model: PertanyaanSurvei,
            attributes: ['id', 'teks_pertanyaan', 'tipe_pertanyaan', 'opsi', 'is_required', 'tipe_visualisasi'],
            order: [['created_at', 'ASC']]
          }
        ]
      }
    ]
  });
  if (!responSurvei) throw new Error('Respon survei not found');
  return responSurvei;
};

export const destroy = async (responSurveiId) => {
  const transaction = await sequelize.transaction();

  try {
    const responSurvei = await ResponSurvei.findByPk(responSurveiId, { transaction });
    if (!responSurvei) throw new Error('Respon survei not found');

    await responSurvei.destroy({ transaction });
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
