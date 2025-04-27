import db from '../models/index.js';
const { PertanyaanSurvei, Survei, sequelize } = db;

export const index = async (surveiId) => {
  return await PertanyaanSurvei.findAll({
    where: { id_survei: surveiId },
    include: [
      { 
        model: Survei, 
        attributes: ['judul', 'status']
      }
    ]
  });
};

export const create = async (pertanyaanSurveiData) => {
  const transaction = await sequelize.transaction();

  try {
    const survei = await Survei.findByPk(pertanyaanSurveiData.id_survei, { transaction });
    if (!survei) throw new Error('Survei not found');

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
  if (!pertanyaanSurvei) throw new Error('Pertanyaan survei not found');
  return pertanyaanSurvei;
};

export const update = async (pertanyaanSurveiId, updateData) => {
  const transaction = await sequelize.transaction();

  try {
    const pertanyaanSurvei = await PertanyaanSurvei.findByPk(pertanyaanSurveiId, { transaction });
    if (!pertanyaanSurvei) throw new Error('Pertanyaan survei not found');

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
    if (!pertanyaanSurvei) throw new Error('pertanyaan survei not found');

    await pertanyaanSurvei.destroy({ transaction });
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
