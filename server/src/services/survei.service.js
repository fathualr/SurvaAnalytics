import db from '../models/index.js';
const { Survei, Umum, sequelize } = db;

export const index = async (filters = {}) => {
  return await Survei.findAll({
    where: filters,
    include: [
      { model: Umum, required: false }
    ]
  });
};

export const create = async (surveiData) => {
  const transaction = await sequelize.transaction();
  
  try {
    const survei = await Survei.create( surveiData, { transaction });

    await transaction.commit();
    return await Survei.findByPk(survei.id, { include: [Umum] });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const show = async (surveiId) => {
  const survei = await Survei.findByPk(surveiId, {
    include: [
      { model: Umum, required: false }
    ]
  });
  if (!survei) throw new Error('Survei not found');
  return survei;
};

export const update = async (surveiId, updateData) => {
  const transaction = await sequelize.transaction();

  try {
    const survei = await Survei.findByPk(surveiId, { transaction });
    if (!survei) throw new Error('Survei not found');

    await survei.update(updateData, { transaction });
    await transaction.commit();
    return await Survei.findByPk(survei.id, { include: [Umum] });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const destroy = async (surveiId) => {
  const transaction = await sequelize.transaction();

  try {
    const survei = await Survei.findByPk(surveiId, { transaction });
    if (!survei) throw new Error('Survei not found');

    await survei.destroy({ transaction });
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
