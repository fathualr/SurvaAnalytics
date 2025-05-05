import db from '../models/index.js';
const { PertanyaanSurvei, Survei, sequelize } = db;
import { parseQuery, metaQueryFormat } from '../utils/queryParser.js';

export const index = async (surveiId, queryParams) => {
  const { where, order, pagination } = parseQuery(queryParams, {
    allowedFilters: ['tipe_pertanyaan', 'status'],
    defaultSort: 'index'
  });

  const { count, rows } = await PertanyaanSurvei.findAndCountAll({
    where: {
      ...where,
      id_survei: surveiId
    },
    include: [
      { 
        model: Survei, 
        attributes: ['judul', 'status']
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

export const create = async (pertanyaanSurveiData) => {
  const transaction = await sequelize.transaction();

  try {
    const survei = await Survei.findByPk(pertanyaanSurveiData.id_survei, { transaction });
    if (!survei) throw { status: 404, message: 'Survei not found' };

    const pertanyaanSurvei = await PertanyaanSurvei.create( pertanyaanSurveiData, { transaction });

    await transaction.commit();
    return pertanyaanSurvei;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const show = async (pertanyaanSurveiId) => {
  const pertanyaanSurvei = await PertanyaanSurvei.findByPk(pertanyaanSurveiId, {
    include: [
      { 
        model: Survei,
        attributes: ['judul', 'status']
      }
    ]
  });
  if (!pertanyaanSurvei) throw { status: 404, message: 'Peranyaan survei not found' };
  return pertanyaanSurvei;
};

export const update = async (pertanyaanSurveiId, updateData) => {
  const transaction = await sequelize.transaction();

  try {
    const pertanyaanSurvei = await PertanyaanSurvei.findByPk(pertanyaanSurveiId, { transaction });
    if (!pertanyaanSurvei) throw { status: 404, message: 'Pertanyaan survei not found' };

    await pertanyaanSurvei.update(updateData, { transaction });
    await transaction.commit();
    return pertanyaanSurvei;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const destroy = async (pertanyaanSurveiId) => {
  const transaction = await sequelize.transaction();

  try {
    const pertanyaanSurvei = await PertanyaanSurvei.findByPk(pertanyaanSurveiId, { transaction });
    if (!pertanyaanSurvei) throw { status: 404, message: 'Pertanyaan survei not found' };

    await pertanyaanSurvei.destroy({ transaction });
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
